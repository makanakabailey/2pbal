import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { generatePackageRecommendation } from "./recommendation-engine";
import { uploadFiles, deleteFiles, getFileCategory } from "./file-upload";
import { setupFileManagementRoutes } from "./file-management-routes";
import audioUploadRoutes from "./audio-upload-routes";
import { sendEmail, generateVerificationEmailHTML, generatePackageReminderEmailHTML } from "./email-service";
import { 
  insertQuoteSchema, 
  loginSchema, 
  signupSchema, 
  profileUpdateSchema,
  insertProjectSchema,
  avatarUploadSchema,
  preferencesUpdateSchema,
  changePasswordSchema,
  accountDeletionSchema,
  emailVerificationSchema,
  createPaymentIntentSchema,
  createSubscriptionSchema,
  updatePaymentSchema,
  cancelSubscriptionSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import cookieParser from "cookie-parser";
import { z } from "zod";

// Configure Stripe (optional in development)
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-07-30.basil",
  });
} else if (process.env.NODE_ENV !== 'development') {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 10 // Maximum 10 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime',
      'application/pdf', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain', 'application/zip'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Authentication middleware
async function requireAuth(req: any, res: any, next: any) {
  try {
    const sessionId = req.cookies?.session;
    if (!sessionId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const session = await storage.getSession(sessionId);
    if (!session) {
      res.clearCookie('session');
      return res.status(401).json({ message: "Invalid or expired session" });
    }

    const user = await storage.getUser(session.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.session = session;
    
    // Log activity
    await storage.logActivity({
      userId: user.id,
      action: `${req.method} ${req.path}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Authentication error" });
  }
}

// Admin middleware
async function requireAdmin(req: any, res: any, next: any) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}

// Email verification middleware
async function requireEmailVerification(req: any, res: any, next: any) {
  if (!req.user?.emailVerified) {
    return res.status(403).json({ 
      message: "Email verification required. Please check your email and verify your account before making purchases.",
      requiresVerification: true
    });
  }
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Register audio upload routes
  app.use('/api/audio', audioUploadRoutes);
  app.use(cookieParser());

  // Authentication routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const result = signupSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(result.data.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      const user = await storage.createUser(result.data);
      
      // Create email verification token
      const verificationToken = await storage.createEmailVerificationToken(user.id, user.email);
      
      // Send verification email
      const verificationLink = `${req.protocol}://${req.get('host')}/verify-email?token=${verificationToken.token}`;
      const emailHTML = generateVerificationEmailHTML(user.firstName || 'there', verificationLink);
      
      const emailSent = await sendEmail({
        to: user.email,
        subject: 'Verify Your Email - Welcome to 2Pbal!',
        html: emailHTML
      });

      if (!emailSent) {
        console.error('Failed to send verification email to:', user.email);
        // Continue with signup even if email fails
      }

      // Create session but user won't be able to make purchases until verified
      const session = await storage.createSession(user.id);

      // Set session cookie
      res.cookie('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
      });

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json({ 
        user: userWithoutPassword,
        message: emailSent ? 'Account created! Please check your email to verify your account.' : 'Account created! Please contact support if you need to verify your email.'
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Failed to create account" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const result = loginSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const loginResult = await storage.loginUser(result.data);
      if (!loginResult) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const { user, session } = loginResult;

      // Set session cookie
      res.cookie('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
      });

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      const sessionId = req.cookies?.session;
      if (sessionId) {
        await storage.deleteSession(sessionId);
      }
      res.clearCookie('session');
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Failed to logout" });
    }
  });

  app.get("/api/auth/me", requireAuth, async (req: any, res) => {
    try {
      const { password: _, ...userWithoutPassword } = req.user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // Email verification routes
  app.get("/api/auth/verify-email", async (req, res) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: "Verification token is required" });
      }

      const verified = await storage.verifyEmailToken(token);
      if (!verified) {
        return res.status(400).json({ message: "Invalid or expired verification token" });
      }

      res.json({ message: "Email verified successfully! You can now make purchases." });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ message: "Failed to verify email" });
    }
  });

  app.post("/api/auth/resend-verification", requireAuth, async (req: any, res) => {
    try {
      if (req.user.emailVerified) {
        return res.status(400).json({ message: "Email is already verified" });
      }

      // Create new verification token
      const verificationToken = await storage.createEmailVerificationToken(req.user.id, req.user.email);
      
      // Send verification email
      const verificationLink = `${req.protocol}://${req.get('host')}/verify-email?token=${verificationToken.token}`;
      const emailHTML = generateVerificationEmailHTML(req.user.firstName || 'there', verificationLink);
      
      const emailSent = await sendEmail({
        to: req.user.email,
        subject: 'Verify Your Email - 2Pbal',
        html: emailHTML
      });

      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send verification email" });
      }

      res.json({ message: "Verification email sent successfully" });
    } catch (error) {
      console.error("Resend verification error:", error);
      res.status(500).json({ message: "Failed to resend verification email" });
    }
  });

  // Check if email exists (for proactive validation)
  app.get("/api/auth/check-email", async (req, res) => {
    try {
      const { email } = req.query;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      res.json({ exists: !!user });
    } catch (error) {
      console.error("Check email error:", error);
      res.status(500).json({ message: "Failed to check email" });
    }
  });

  // Magic Link Authentication
  app.post("/api/auth/magic-link", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if user exists for security
        return res.json({ message: "If an account exists with this email, a magic link has been sent" });
      }

      // Generate magic link token (reuse email verification token structure)
      const magicToken = await storage.createEmailVerificationToken(user.id, user.email);
      
      // Create magic link
      const magicLink = `${req.protocol}://${req.get('host')}/auth/magic-login?token=${magicToken.token}`;
      
      // Send magic link email
      const magicLinkHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Magic Login Link - 2Pbal</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #14b8a6, #0891b2); padding: 30px; text-align: center; color: white; }
                .content { background: #f9fafb; padding: 30px; }
                .button { display: inline-block; background: linear-gradient(135deg, #14b8a6, #0891b2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                .footer { text-align: center; color: #666; font-size: 12px; padding: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🚀 Your Magic Login Link</h1>
                    <p>Secure access to your 2Pbal account</p>
                </div>
                <div class="content">
                    <p>Hi ${user.firstName || 'there'}!</p>
                    <p>Click the button below to securely log in to your 2Pbal account. No password needed!</p>
                    <p style="text-align: center;">
                        <a href="${magicLink}" class="button">🔐 Log In Securely</a>
                    </p>
                    <p><strong>Important:</strong> This link expires in 10 minutes for your security.</p>
                    <p>If you didn't request this login link, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>© 2025 2Pbal - Precise Programming for Business Advancement</p>
                    <p>If you have questions, contact us at hello@2pbal.com</p>
                </div>
            </div>
        </body>
        </html>
      `;
      
      const emailSent = await sendEmail({
        to: user.email,
        subject: '🔐 Your Magic Login Link - 2Pbal',
        html: magicLinkHTML
      });

      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send magic link" });
      }

      res.json({ message: "If an account exists with this email, a magic link has been sent" });
    } catch (error) {
      console.error("Magic link error:", error);
      res.status(500).json({ message: "Failed to send magic link" });
    }
  });

  // Magic Link Login Handler
  app.get("/api/auth/magic-login", async (req, res) => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ message: "Invalid magic link" });
      }

      // Get the verification token first to get user info
      const verificationToken = await storage.getEmailVerificationToken(token as string);
      if (!verificationToken) {
        return res.status(400).json({ message: "Invalid magic link" });
      }

      const user = await storage.getUser(verificationToken.userId);
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Verify and delete the token
      const verified = await storage.verifyEmailToken(token as string);
      if (!verified) {
        return res.status(400).json({ message: "Magic link expired or invalid" });
      }

      // Create session
      const session = await storage.createSession(user.id);

      // Set session cookie
      res.cookie('session', session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'lax'
      });

      // Redirect to dashboard
      res.redirect('/dashboard');
    } catch (error) {
      console.error("Magic login error:", error);
      res.redirect('/login?error=magic-link-failed');
    }
  });

  // Account Management Routes
  app.put("/api/users/profile", requireAuth, async (req: any, res) => {
    try {
      const result = profileUpdateSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      // Generate package recommendation
      const recommendation = generatePackageRecommendation(result.data);
      
      const updatedUser = await storage.updateUserWithRecommendation(req.user.id, result.data, recommendation);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ 
        user: userWithoutPassword,
        recommendation: recommendation
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // New route to get package recommendation
  app.get("/api/users/recommendation", requireAuth, async (req: any, res) => {
    try {
      const user = req.user;
      if (!user.recommendedPackage) {
        return res.status(404).json({ message: "No recommendation available" });
      }

      res.json({
        packageType: user.recommendedPackage,
        score: user.recommendationScore,
        reason: user.recommendationReason,
        date: user.recommendationDate
      });
    } catch (error) {
      console.error("Get recommendation error:", error);
      res.status(500).json({ message: "Failed to get recommendation" });
    }
  });

  app.post("/api/users/avatar", requireAuth, upload.single('avatar'), async (req: any, res) => {
    try {
      let avatarData = '';
      
      if (req.file) {
        // Convert uploaded file to base64
        avatarData = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      } else if (req.body.avatar) {
        // Use provided base64 avatar data
        avatarData = req.body.avatar;
      } else {
        return res.status(400).json({ message: "No avatar data provided" });
      }

      const updatedUser = await storage.updateAvatar(req.user.id, avatarData);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Avatar update error:", error);
      res.status(500).json({ message: "Failed to update avatar" });
    }
  });

  app.put("/api/users/preferences", requireAuth, async (req: any, res) => {
    try {
      const result = preferencesUpdateSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const updatedUser = await storage.updatePreferences(req.user.id, result.data);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Preferences update error:", error);
      res.status(500).json({ message: "Failed to update preferences" });
    }
  });

  app.delete("/api/users/account", requireAuth, async (req: any, res) => {
    try {
      const result = accountDeletionSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const deleted = await storage.deleteUser(req.user.id, result.data.password);
      if (!deleted) {
        return res.status(400).json({ message: "Invalid password or user not found" });
      }

      res.clearCookie('session');
      res.json({ message: "Account deleted successfully" });
    } catch (error) {
      console.error("Account deletion error:", error);
      res.status(500).json({ message: "Failed to delete account" });
    }
  });

  app.get("/api/users/subscription", requireAuth, async (req: any, res) => {
    try {
      const subscription = req.user.subscription || {
        plan: "free",
        status: "active",
        startDate: req.user.createdAt,
        features: ["basic_support", "1_project"]
      };
      
      res.json({ subscription });
    } catch (error) {
      console.error("Get subscription error:", error);
      res.status(500).json({ message: "Failed to get subscription details" });
    }
  });

  app.post("/api/users/change-password", requireAuth, async (req: any, res) => {
    try {
      const result = changePasswordSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const changed = await storage.changePassword(
        req.user.id, 
        result.data.currentPassword, 
        result.data.newPassword
      );
      
      if (!changed) {
        return res.status(400).json({ message: "Current password is incorrect" });
      }

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  app.post("/api/users/verify-email", async (req, res) => {
    try {
      const result = emailVerificationSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const verified = await storage.verifyEmail(result.data.token);
      if (!verified) {
        return res.status(400).json({ message: "Invalid or expired verification token" });
      }

      res.json({ message: "Email verified successfully" });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ message: "Failed to verify email" });
    }
  });

  // Admin Routes
  app.get("/api/admin/users", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const users = await storage.getAllUsers();
      const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
      res.json({ users: usersWithoutPasswords });
    } catch (error) {
      console.error("Get all users error:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/admin/activity-logs", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      
      const logs = await storage.getActivityLogs(userId, limit);
      res.json({ logs });
    } catch (error) {
      console.error("Get activity logs error:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  app.put("/api/admin/users/:userId/role", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { role } = req.body;
      
      if (!['user', 'admin'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const updatedUser = await storage.updateUserRole(userId, role);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await storage.logActivity({
        adminId: req.user.id,
        action: `Updated user role to ${role}`,
        target: 'user',
        targetId: userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Update user role error:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Admin: Block/Unblock user
  app.put("/api/admin/users/:userId/status", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { isActive } = req.body;
      
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "Invalid status value" });
      }

      const updatedUser = await storage.updateUser(userId, { isActive } as any);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      await storage.logActivity({
        adminId: req.user.id,
        action: isActive ? 'Unblocked user' : 'Blocked user',
        target: 'user',
        targetId: userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Update user status error:", error);
      res.status(500).json({ message: "Failed to update user status" });
    }
  });

  // Admin: Delete user account
  app.delete("/api/admin/users/:userId", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const userId = parseInt(req.params.userId);
      
      // Prevent admin from deleting themselves
      if (userId === req.user.id) {
        return res.status(400).json({ message: "Cannot delete your own account" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Use a temporary password for admin deletion
      const deleted = await storage.deleteUser(userId, 'admin-force-delete');
      if (!deleted) {
        // Force delete from database directly if regular delete fails
        await storage.forceDeleteUser(userId);
      }

      await storage.logActivity({
        adminId: req.user.id,
        action: `Deleted user account`,
        target: 'user',
        targetId: userId,
        details: { deletedUserEmail: user.email },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Failed to delete user account" });
    }
  });

  // Quote routes
  app.get("/api/quotes", async (req: any, res) => {
    try {
      // If user is authenticated, get their quotes, otherwise get all quotes
      const sessionId = req.cookies?.session;
      let userId = undefined;
      
      if (sessionId) {
        const session = await storage.getSession(sessionId);
        if (session) {
          userId = session.userId;
        }
      }
      
      const quotes = await storage.getQuotes(userId);
      res.json({ quotes });
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  app.post("/api/quotes", upload.any(), async (req, res) => {
    try {
      // Parse array fields that come as JSON strings
      const formData = { ...req.body };
      if (formData.goals && typeof formData.goals === 'string') {
        formData.goals = JSON.parse(formData.goals);
      }
      if (formData.overspending && typeof formData.overspending === 'string') {
        formData.overspending = JSON.parse(formData.overspending);
      }
      if (formData.outcomes && typeof formData.outcomes === 'string') {
        formData.outcomes = JSON.parse(formData.outcomes);
      }
      
      // Check if user is authenticated and link quote to user
      const sessionId = req.cookies?.session;
      if (sessionId) {
        const session = await storage.getSession(sessionId);
        if (session) {
          formData.userId = session.userId;
        }
      }
      
      // Upload files to Cloudinary
      const files = req.files as Express.Multer.File[];
      let attachments: {
        filename: string;
        mimetype: string;
        size: number;
        cloudinary_url: string;
        cloudinary_public_id: string;
        upload_date: string;
      }[] = [];
      
      if (files && files.length > 0) {
        try {
          attachments = await uploadFiles(files, 'quotes');
          console.log(`Uploaded ${attachments.length} files to Cloudinary for quote`);
        } catch (uploadError) {
          console.error("File upload error:", uploadError);
          return res.status(500).json({ 
            success: false, 
            error: "Failed to upload files to cloud storage",
            details: uploadError.message
          });
        }
      }
      
      const quoteData = insertQuoteSchema.parse({
        ...formData,
        attachments
      });
      
      const quote = await storage.createQuote(quoteData);
      
      res.json({ 
        success: true, 
        quote,
        message: `Quote submitted successfully${files?.length ? ` with ${files.length} attachment(s)` : ''}` 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Invalid quote data", 
          details: error.errors 
        });
      } else if (error instanceof multer.MulterError) {
        res.status(400).json({ 
          success: false, 
          error: error.message === 'File too large' ? 'File size exceeds 10MB limit' : 'File upload error',
          details: error.message
        });
      } else {
        console.error('Quote submission error:', error);
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit quote request" 
        });
      }
    }
  });

  // Package tracking routes
  app.post("/api/packages/track-view", async (req, res) => {
    try {
      const { packageName, packageType, viewDuration, pageUrl } = req.body;
      
      // Get user ID if authenticated
      let userId = null;
      let sessionId = null;
      
      const sessionCookie = req.cookies?.session;
      if (sessionCookie) {
        const session = await storage.getSession(sessionCookie);
        if (session) {
          userId = session.userId;
        }
      }
      
      // Use session ID for anonymous tracking if no user
      if (!userId) {
        sessionId = req.cookies?.session || `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      const trackingData = {
        userId,
        sessionId,
        packageName,
        packageType,
        viewDuration: viewDuration || 0,
        pageUrl,
        userAgent: req.get('User-Agent'),
        viewCount: 1
      };
      
      await storage.trackPackageView(trackingData);
      
      res.json({ success: true, message: "Package view tracked" });
    } catch (error) {
      console.error("Package tracking error:", error);
      res.status(500).json({ message: "Failed to track package view" });
    }
  });

  app.get("/api/packages/recommendations", requireAuth, async (req: any, res) => {
    try {
      const mostViewedPackage = await storage.getMostViewedPackageForUser(req.user.id);
      
      if (!mostViewedPackage) {
        return res.json({ message: "No package views found" });
      }
      
      res.json({
        recommendedPackage: {
          name: mostViewedPackage.packageName,
          type: mostViewedPackage.packageType,
          viewCount: mostViewedPackage.viewCount,
          totalViewTime: mostViewedPackage.viewDuration,
          lastViewed: mostViewedPackage.updatedAt
        }
      });
    } catch (error) {
      console.error("Package recommendations error:", error);
      res.status(500).json({ message: "Failed to get package recommendations" });
    }
  });

  // Project routes
  app.get("/api/projects", requireAuth, async (req: any, res) => {
    try {
      const projects = await storage.getUserProjects(req.user.id);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", requireAuth, async (req: any, res) => {
    try {
      const result = insertProjectSchema.safeParse({
        ...req.body,
        userId: req.user.id
      });
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const project = await storage.createProject(result.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Enhanced Payment System Routes
  
  // Create Payment Intent with multiple payment methods support
  app.post("/api/create-payment-intent", requireAuth, requireEmailVerification, async (req: any, res) => {
    try {
      const result = createPaymentIntentSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      const { amount, currency = "usd", serviceId, planId, description, metadata } = result.data;

      // Get or create customer if user is authenticated
      let customerId = undefined;
      const sessionId = req.cookies?.session;
      if (sessionId) {
        const session = await storage.getSession(sessionId);
        if (session) {
          const user = await storage.getUser(session.userId);
          if (user?.email) {
            const customers = await stripe.customers.list({ email: user.email, limit: 1 });
            if (customers.data.length > 0) {
              customerId = customers.data[0].id;
            } else {
              const customer = await stripe.customers.create({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`.trim(),
                metadata: { userId: session.userId.toString() }
              });
              customerId = customer.id;
            }
          }
        }
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        customer: customerId,
        automatic_payment_methods: {
          enabled: true, // Enables Apple Pay, Google Pay, etc.
        },
        payment_method_options: {
          card: {
            request_three_d_secure: 'automatic',
          },
        },
        description: description || `Payment for ${serviceId ? `service ${serviceId}` : 'services'}`,
        metadata: {
          serviceId: serviceId || '',
          planId: planId || '',
          userId: sessionId ? 'authenticated' : 'guest',
          ...metadata
        }
      });

      // Store payment record in database
      if (sessionId) {
        const session = await storage.getSession(sessionId);
        if (session) {
          await storage.createPayment({
            userId: session.userId,
            stripePaymentIntentId: paymentIntent.id,
            stripeCustomerId: customerId,
            amount: Math.round(amount * 100),
            currency,
            status: 'pending',
            description: paymentIntent.description,
            metadata: paymentIntent.metadata
          });
        }
      }

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id 
      });
    } catch (error: any) {
      console.error("Payment intent creation error:", error);
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  // Create Subscription for recurring payments
  app.post("/api/create-subscription", requireAuth, requireEmailVerification, async (req: any, res) => {
    try {
      const result = createSubscriptionSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      const { priceId, packageType } = result.data;
      const user = req.user;

      // Get or create customer
      let customer;
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          metadata: { userId: user.id.toString() }
        });
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Store subscription in database
      await storage.createSubscription({
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customer.id,
        stripePriceId: priceId,
        packageType,
        status: subscription.status as any,
        currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        amount: subscription.items.data[0].price.unit_amount || 0,
        currency: subscription.items.data[0].price.currency,
        interval: subscription.items.data[0].price.recurring?.interval || 'month',
        intervalCount: subscription.items.data[0].price.recurring?.interval_count || 1
      });

      const clientSecret = (subscription.latest_invoice as any)?.payment_intent?.client_secret;

      res.json({
        subscriptionId: subscription.id,
        clientSecret,
        status: subscription.status
      });
    } catch (error: any) {
      console.error("Subscription creation error:", error);
      res.status(500).json({ 
        message: "Error creating subscription: " + error.message 
      });
    }
  });

  // Update Payment Status (webhook handler)
  app.post("/api/payment-webhook", async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      let event;

      try {
        event = stripe?.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
      } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      if (!event) {
        return res.status(400).json({ message: "Invalid event" });
      }

      // Handle the event
      switch (event.type) {
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          const payment = await storage.getPaymentByStripeId(paymentIntent.id);
          if (payment) {
            await storage.updatePayment(payment.id, {
              status: 'succeeded',
              paymentMethod: paymentIntent.payment_method_types?.[0],
              receiptUrl: (paymentIntent as any).charges?.data[0]?.receipt_url
            });
          }
          break;

        case 'payment_intent.payment_failed':
          const failedPayment = event.data.object;
          const failedPaymentRecord = await storage.getPaymentByStripeId(failedPayment.id);
          if (failedPaymentRecord) {
            await storage.updatePayment(failedPaymentRecord.id, { status: 'failed' });
          }
          break;

        case 'invoice.payment_succeeded':
          const invoice = event.data.object;
          // Handle subscription payment success
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook processing failed" });
    }
  });

  // Get User Payment History
  app.get("/api/payments", requireAuth, async (req: any, res) => {
    try {
      const payments = await storage.getUserPayments(req.user.id);
      res.json({ payments });
    } catch (error: any) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ message: "Failed to fetch payments" });
    }
  });

  // Get User Subscriptions
  app.get("/api/subscriptions", requireAuth, async (req: any, res) => {
    try {
      const subscriptions = await storage.getUserSubscriptions(req.user.id);
      res.json({ subscriptions });
    } catch (error: any) {
      console.error("Error fetching subscriptions:", error);
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  // Create new subscription
  app.post("/api/subscriptions/create", requireAuth, async (req: any, res) => {
    try {
      const result = createSubscriptionSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      const { priceId, packageType } = result.data;
      const user = req.user;

      // Get or create customer
      let customer;
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          metadata: { userId: user.id.toString() }
        });
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      // Store subscription in database
      await storage.createSubscription({
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customer.id,
        stripePriceId: priceId,
        packageType,
        status: subscription.status as any,
        currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        amount: subscription.items.data[0].price.unit_amount || 0,
        currency: subscription.items.data[0].price.currency,
        interval: subscription.items.data[0].price.recurring?.interval || 'month',
        intervalCount: subscription.items.data[0].price.recurring?.interval_count || 1
      });

      const clientSecret = (subscription.latest_invoice as any)?.payment_intent?.client_secret;

      res.json({
        subscriptionId: subscription.id,
        clientSecret,
        status: subscription.status
      });
    } catch (error: any) {
      console.error("Subscription creation error:", error);
      res.status(500).json({ 
        message: "Error creating subscription: " + error.message 
      });
    }
  });

  // Update subscription plan
  app.put("/api/subscriptions/update", requireAuth, async (req: any, res) => {
    try {
      const { subscriptionId, newPriceId } = req.body;

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      // Verify subscription belongs to user
      const subscription = await storage.getSubscriptionByStripeId(subscriptionId);
      if (!subscription || subscription.userId !== req.user.id) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Get current subscription from Stripe
      const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      // Update subscription
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: stripeSubscription.items.data[0].id,
          price: newPriceId,
        }],
        proration_behavior: 'create_prorations',
      });

      // Update in database
      await storage.updateSubscription(subscription.id, {
        stripePriceId: newPriceId,
        amount: updatedSubscription.items.data[0].price.unit_amount || 0,
        interval: updatedSubscription.items.data[0].price.recurring?.interval || 'month',
        intervalCount: updatedSubscription.items.data[0].price.recurring?.interval_count || 1
      });

      res.json({ 
        message: "Subscription updated successfully",
        subscription: updatedSubscription
      });
    } catch (error: any) {
      console.error("Subscription update error:", error);
      res.status(500).json({ 
        message: "Error updating subscription: " + error.message 
      });
    }
  });

  // Cancel subscription
  app.post("/api/subscriptions/cancel", requireAuth, async (req: any, res) => {
    try {
      const result = cancelSubscriptionSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      const { subscriptionId, cancelAtPeriodEnd } = result.data;
      
      // Verify subscription belongs to user
      const subscription = await storage.getSubscriptionByStripeId(subscriptionId);
      if (!subscription || subscription.userId !== req.user.id) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      // Cancel in Stripe
      const stripeSubscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: cancelAtPeriodEnd
      });

      // Update in database
      await storage.updateSubscription(subscription.id, {
        cancelAtPeriodEnd,
        canceledAt: cancelAtPeriodEnd ? null : new Date()
      });

      res.json({ 
        message: cancelAtPeriodEnd ? "Subscription will be canceled at period end" : "Subscription canceled",
        subscription: stripeSubscription
      });
    } catch (error: any) {
      console.error("Subscription cancellation error:", error);
      res.status(500).json({ 
        message: "Error canceling subscription: " + error.message 
      });
    }
  });

  // Get subscription invoices
  app.get("/api/subscriptions/invoices", requireAuth, async (req: any, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      // Get user's subscriptions
      const subscriptions = await storage.getUserSubscriptions(req.user.id);
      let allInvoices: any[] = [];

      for (const subscription of subscriptions) {
        if (subscription.stripeCustomerId) {
          const invoices = await stripe.invoices.list({
            customer: subscription.stripeCustomerId,
            limit: 100,
          });
          allInvoices = allInvoices.concat(invoices.data);
        }
      }

      // Sort by date descending
      allInvoices.sort((a, b) => b.created - a.created);

      res.json({ invoices: allInvoices });
    } catch (error: any) {
      console.error("Error fetching invoices:", error);
      res.status(500).json({ message: "Failed to fetch invoices" });
    }
  });

  // Create customer portal session
  app.post("/api/subscriptions/portal", requireAuth, async (req: any, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      const user = req.user;
      
      // Get or create customer
      let customerId;
      const customers = await stripe.customers.list({ email: user.email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim(),
          metadata: { userId: user.id.toString() }
        });
        customerId = customer.id;
      }

      // Create portal session
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${req.headers.origin}/subscription-management`,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Portal session creation error:", error);
      res.status(500).json({ 
        message: "Error creating portal session: " + error.message 
      });
    }
  });

  // Admin subscription management endpoints
  app.get("/api/admin/subscriptions", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const allSubscriptions = await storage.getAllSubscriptions();
      
      // Enrich with user data
      const enrichedSubscriptions = await Promise.all(
        allSubscriptions.map(async (subscription) => {
          const user = await storage.getUser(subscription.userId);
          return {
            ...subscription,
            customerName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
            customerEmail: user ? user.email : 'Unknown'
          };
        })
      );

      res.json({ subscriptions: enrichedSubscriptions });
    } catch (error: any) {
      console.error("Error fetching admin subscriptions:", error);
      res.status(500).json({ message: "Failed to fetch subscriptions" });
    }
  });

  app.post("/api/admin/subscriptions/create", requireAuth, requireAdmin, async (req: any, res) => {
    try {
      const { customerEmail, priceId, packageType } = req.body;

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      // Get customer user
      const user = await storage.getUserByEmail(customerEmail);
      if (!user) {
        return res.status(404).json({ message: "Customer not found" });
      }

      // Get or create Stripe customer
      let customer;
      const customers = await stripe.customers.list({ email: customerEmail, limit: 1 });
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email: customerEmail,
          name: `${user.firstName} ${user.lastName}`.trim(),
          metadata: { userId: user.id.toString() }
        });
      }

      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        collection_method: 'charge_automatically',
      });

      // Store in database
      await storage.createSubscription({
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: customer.id,
        stripePriceId: priceId,
        packageType,
        status: subscription.status as any,
        currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
        amount: subscription.items.data[0].price.unit_amount || 0,
        currency: subscription.items.data[0].price.currency,
        interval: subscription.items.data[0].price.recurring?.interval || 'month',
        intervalCount: subscription.items.data[0].price.recurring?.interval_count || 1
      });

      await storage.logActivity({
        adminId: req.user.id,
        action: 'Created subscription',
        target: 'subscription',
        targetId: user.id,
        details: { customerEmail, packageType },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.json({
        message: "Subscription created successfully",
        subscription
      });
    } catch (error: any) {
      console.error("Admin subscription creation error:", error);
      res.status(500).json({ 
        message: "Error creating subscription: " + error.message 
      });
    }
  });

  // Setup file management routes
  setupFileManagementRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}