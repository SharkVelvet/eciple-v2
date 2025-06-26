import express from "express";
import { createServer } from "http";
import { storage } from "./storage.js";
import { hashPassword, verifyPassword, generateSessionId, requireAuth } from "./auth.js";
import { insertEcipleDocumentSchema, insertContactRequestSchema } from "../shared/schema.js";

export async function registerRoutes(app: express.Express) {
  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const admin = await storage.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await verifyPassword(password, admin.passwordHash);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Create session
      const sessionId = generateSessionId();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      
      await storage.createAdminSession(sessionId, admin.id, expiresAt);
      await storage.updateAdminLastLogin(admin.id);

      res.json({
        token: sessionId,
        admin: {
          id: admin.id,
          username: admin.username
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/admin/logout", requireAuth, async (req, res) => {
    try {
      await storage.deleteAdminSession((req as any).sessionId);
      res.json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ error: "Logout failed" });
    }
  });

  app.get("/api/admin/verify", requireAuth, async (req, res) => {
    res.json({
      admin: {
        id: (req as any).admin.id,
        username: (req as any).admin.username
      }
    });
  });

  // Document management routes
  app.get("/api/eciple-documents", async (req, res) => {
    try {
      const documents = await storage.getEcipleDocuments();
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ error: "Failed to fetch documents" });
    }
  });

  app.post("/api/admin/eciple-documents", requireAuth, async (req, res) => {
    try {
      const documentData = insertEcipleDocumentSchema.parse(req.body);
      const document = await storage.createEcipleDocument(documentData);
      res.json(document);
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ error: "Failed to create document" });
    }
  });

  app.put("/api/admin/eciple-documents/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const document = await storage.updateEcipleDocument(id, updates);
      
      if (!document) {
        return res.status(404).json({ error: "Document not found" });
      }
      
      res.json(document);
    } catch (error) {
      console.error("Error updating document:", error);
      res.status(500).json({ error: "Failed to update document" });
    }
  });

  app.delete("/api/admin/eciple-documents/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteEcipleDocument(id);
      res.json({ message: "Document deleted successfully" });
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: "Failed to delete document" });
    }
  });

  // Contact form route
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactRequestSchema.parse(req.body);
      const contact = await storage.createContactRequest(contactData);
      res.json(contact);
    } catch (error) {
      console.error("Error creating contact request:", error);
      res.status(500).json({ error: "Failed to submit contact request" });
    }
  });

  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getAllContactRequests();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}