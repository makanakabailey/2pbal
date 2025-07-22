import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { insertQuoteSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Quote submission endpoint with file upload support
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
      
      // Process uploaded files
      const files = req.files as Express.Multer.File[];
      const attachments = files?.map(file => ({
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        // In a real application, you would save the file to disk or cloud storage
        // and store the file path/URL. For now, we'll just store metadata.
        data: file.buffer.toString('base64') // Convert to base64 for storage
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

  // Get all quotes (for admin purposes)
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuotes();
      res.json({ quotes });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch quotes" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
