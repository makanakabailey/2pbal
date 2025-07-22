import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertQuoteSchema, 
  loginSchema, 
  signupSchema, 
  profileUpdateSchema,
  insertProjectSchema 
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import cookieParser from "cookie-parser";
import { z } from "zod";

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
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Authentication error" });
  }
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

  // Profile routes
  app.put("/api/profile", requireAuth, async (req: any, res) => {
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

  const httpServer = createServer(app);
  return httpServer;
}