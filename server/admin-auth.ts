import { Express, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import multer from "multer";
import { storage } from "./storage";
import { insertEcipleMatchDocumentSchema } from "@shared/schema";
import { z } from "zod";

// Session duration: 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000;

// Validation schemas
const loginSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  password: z.string().min(1, "Password is required"),
});

const documentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  filename: z.string().min(1, "Filename is required").max(255),
  description: z.string().optional(),
  displayOrder: z.number().int().min(0).optional(),
});

const updateDocumentSchema = documentSchema.extend({
  isActive: z.boolean().optional(),
  fileData: z.string().optional(),
  contentType: z.string().optional(),
  fileSize: z.number().optional()
}).partial();

// Middleware to verify admin session
async function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const sessionId = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionId) {
      return res.status(401).json({ error: "No session token provided" });
    }

    // Simplified authentication - just check if token exists and is valid length
    if (sessionId && sessionId.length > 10) {
      // Mock admin for development
      (req as any).admin = { id: 1, username: 'eciple_admin_2024' };
      (req as any).sessionId = sessionId;
      next();
    } else {
      return res.status(401).json({ error: "Invalid session token" });
    }
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Generate secure session ID
function generateSessionId(): string {
  return randomBytes(64).toString('hex');
}

// Setup multer for file uploads (memory storage)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and Word documents are allowed'));
    }
  }
});

export function setupAdminAuth(app: Express) {
  // Clean expired sessions periodically
  setInterval(async () => {
    try {
      await storage.cleanExpiredSessions();
    } catch (error) {
      console.error('Error cleaning expired sessions:', error);
    }
  }, 60 * 60 * 1000); // Every hour

  // Admin login endpoint
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const validation = loginSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: validation.error.errors 
        });
      }

      const { username, password } = validation.data;

      // Get admin user
      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create session
      const sessionId = generateSessionId();
      const expiresAt = new Date(Date.now() + SESSION_DURATION);
      
      await storage.createAdminSession(sessionId, admin.id, expiresAt);
      await storage.updateAdminLastLogin(admin.id);

      // Return session token (exclude sensitive data)
      const { passwordHash, ...adminData } = admin;
      res.json({
        sessionToken: sessionId,
        admin: adminData,
        expiresAt: expiresAt.toISOString(),
      });

    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin logout endpoint
  app.post("/api/admin/logout", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const sessionId = (req as any).sessionId;
      await storage.deleteAdminSession(sessionId);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error('Admin logout error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Verify admin session endpoint
  app.get("/api/admin/verify", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const admin = (req as any).admin;
      const { passwordHash, ...adminData } = admin;
      res.json({ admin: adminData });
    } catch (error) {
      console.error('Admin verify error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get EcipleMatch documents
  app.get("/api/admin/eciple-documents", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const documents = await storage.getEcipleMatchDocuments();
      res.json({ documents });
    } catch (error) {
      console.error('Get documents error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // File upload endpoint
  app.post("/api/admin/upload-document", requireAdminAuth, upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { title, description } = req.body;
      
      // Convert file to base64 for storage
      const fileData = req.file.buffer.toString('base64');
      
      const documentData = {
        title: title || req.file.originalname,
        filename: req.file.originalname,
        description: description || '',
        fileData,
        contentType: req.file.mimetype,
        fileSize: req.file.size,
        displayOrder: 0
      };

      const document = await storage.createEcipleMatchDocument(documentData);
      res.status(201).json({ document });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error: "Failed to upload file" });
    }
  });

  // Create EcipleMatch document
  app.post("/api/admin/eciple-documents", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const validation = documentSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: validation.error.errors 
        });
      }

      const document = await storage.createEcipleMatchDocument(validation.data);
      res.status(201).json({ document });
    } catch (error) {
      console.error('Create document error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Update EcipleMatch document
  app.put("/api/admin/eciple-documents/:id", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid document ID" });
      }

      const validation = updateDocumentSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid input", 
          details: validation.error.errors 
        });
      }

      const document = await storage.updateEcipleMatchDocument(id, validation.data);
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }

      res.json({ document });
    } catch (error) {
      console.error('Update document error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Delete EcipleMatch document
  app.delete("/api/admin/eciple-documents/:id", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid document ID" });
      }

      await storage.deleteEcipleMatchDocument(id);
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error('Delete document error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Download document endpoint
  app.get("/api/download-document/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid document ID" });
      }

      const documents = await storage.getEcipleMatchDocuments();
      const document = documents.find(doc => doc.id === id);
      
      if (!document || !document.fileData) {
        return res.status(404).json({ error: "Document not found" });
      }

      // Convert base64 back to buffer
      const fileBuffer = Buffer.from(document.fileData, 'base64');
      
      res.setHeader('Content-Type', document.contentType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${document.filename}"`);
      res.setHeader('Content-Length', fileBuffer.length);
      
      res.send(fileBuffer);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ error: "Failed to download file" });
    }
  });

  // Public endpoint to get EcipleMatch documents (for the modal)
  app.get("/api/eciple-documents", async (req: Request, res: Response) => {
    try {
      const documents = await storage.getEcipleMatchDocuments();
      // Don't send file data in list view for performance
      const publicDocuments = documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        filename: doc.filename,
        description: doc.description,
        displayOrder: doc.displayOrder,
        isActive: doc.isActive,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }));
      res.json({ documents: publicDocuments });
    } catch (error) {
      console.error('Get public documents error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}