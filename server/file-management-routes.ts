import type { Express } from "express";
import { upload, uploadFiles, deleteFiles, getFileCategory } from "./file-upload";
import { getOptimizedUrl } from "./cloudinary-config";
import { storage } from "./storage";

export function setupFileManagementRoutes(app: Express) {
  // File upload endpoint for general use
  app.post("/api/files/upload", upload.array("files", 20), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const folder = req.body.folder || 'uploads';
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files provided" });
      }

      const uploadedFiles = await uploadFiles(files, folder);
      
      res.json({
        success: true,
        files: uploadedFiles,
        message: `Successfully uploaded ${uploadedFiles.length} file(s)`
      });
    } catch (error) {
      console.error("File upload error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to upload files",
        error: error.message
      });
    }
  });

  // Get optimized file URL
  app.get("/api/files/optimize/:publicId", (req, res) => {
    try {
      const { publicId } = req.params;
      const { width, height, quality, format } = req.query;
      
      const optimizedUrl = getOptimizedUrl(publicId, {
        width: width ? parseInt(width as string) : undefined,
        height: height ? parseInt(height as string) : undefined,
        quality: quality as string,
        format: format as string,
      });
      
      res.json({ url: optimizedUrl });
    } catch (error) {
      console.error("URL optimization error:", error);
      res.status(500).json({ message: "Failed to generate optimized URL" });
    }
  });

  // Delete files
  app.delete("/api/files/delete", async (req, res) => {
    try {
      const { publicIds } = req.body;
      
      if (!publicIds || !Array.isArray(publicIds)) {
        return res.status(400).json({ message: "Invalid public IDs provided" });
      }

      await deleteFiles(publicIds);
      
      res.json({
        success: true,
        message: `Successfully deleted ${publicIds.length} file(s)`
      });
    } catch (error) {
      console.error("File deletion error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete files",
        error: error.message
      });
    }
  });

  // Get all files for a specific quote (admin only)
  app.get("/api/admin/quotes/:quoteId/files", async (req, res) => {
    try {
      const { quoteId } = req.params;
      const quote = await storage.getQuoteById(parseInt(quoteId));
      
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }

      const files = quote.attachments.map(attachment => ({
        ...attachment,
        category: getFileCategory(attachment.mimetype),
        optimized_url: getOptimizedUrl(attachment.cloudinary_public_id, { quality: 'auto' })
      }));

      res.json({ files });
    } catch (error) {
      console.error("Get quote files error:", error);
      res.status(500).json({ message: "Failed to fetch quote files" });
    }
  });

  // Admin file management dashboard data
  app.get("/api/admin/files/dashboard", async (req, res) => {
    try {
      // Get all quotes with attachments
      const quotes = await storage.getAllQuotes();
      const quotesWithFiles = quotes.filter(quote => quote.attachments.length > 0);
      
      // Aggregate file statistics
      let totalFiles = 0;
      let totalSize = 0;
      const filesByType = {
        image: 0,
        video: 0,
        document: 0,
        audio: 0,
        archive: 0,
        other: 0
      };
      
      const allFiles = [];
      
      quotesWithFiles.forEach(quote => {
        quote.attachments.forEach(file => {
          totalFiles++;
          totalSize += file.size;
          const category = getFileCategory(file.mimetype);
          filesByType[category]++;
          
          allFiles.push({
            ...file,
            quoteId: quote.id,
            quoteEmail: quote.email,
            category,
            optimized_url: getOptimizedUrl(file.cloudinary_public_id, { quality: 'auto' })
          });
        });
      });

      res.json({
        summary: {
          totalFiles,
          totalSize,
          totalSizeFormatted: `${(totalSize / (1024 * 1024)).toFixed(2)} MB`,
          filesByType
        },
        files: allFiles.sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime())
      });
    } catch (error) {
      console.error("Admin file dashboard error:", error);
      res.status(500).json({ message: "Failed to fetch file dashboard data" });
    }
  });
}