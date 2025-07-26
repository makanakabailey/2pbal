import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
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
  emailVerificationSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import cookieParser from "cookie-parser";
import { z } from "zod";

// Configure Stripe (optional in development)
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-06-30.basil",
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

export async function registerRoutes(app: Express): Promise<Server> {
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
      res.status(201).json({ user: userWithoutPassword });
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

  // Account Management Routes
  app.put("/api/users/profile", requireAuth, async (req: any, res) => {
    try {
      const result = profileUpdateSchema.safeParse(req.body);
      if (!result.success) {
        const errorMessage = fromZodError(result.error);
        return res.status(400).json({ message: errorMessage.toString() });
      }

      const updatedUser = await storage.updateUser(req.user.id, result.data);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update profile" });
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
      
      // Process uploaded files
      const files = req.files as Express.Multer.File[];
      const attachments = files?.map(file => ({
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        data: file.buffer.toString('base64')
      })) || [];
      
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

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, serviceId, planId } = req.body;
      
      if (!amount || typeof amount !== 'number') {
        return res.status(400).json({ message: "Valid amount is required" });
      }

      if (!stripe) {
        return res.status(503).json({ message: "Stripe not configured" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          serviceId: serviceId || '',
          planId: planId || ''
        }
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Payment intent creation error:", error);
      res.status(500).json({ 
        message: "Error creating payment intent: " + error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}