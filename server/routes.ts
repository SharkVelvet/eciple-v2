import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = req.body;
      
      // Validate required fields
      if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.churchName) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      // Store contact request
      const savedContact = await storage.createContactRequest(contactData);
      
      return res.status(201).json({
        message: "Contact request received successfully",
        id: savedContact.id
      });
    } catch (error) {
      console.error("Error processing contact request:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all contact requests - for administrative purposes
  app.get("/api/contact", async (req, res) => {
    try {
      const contacts = await storage.getAllContactRequests();
      return res.status(200).json(contacts);
    } catch (error) {
      console.error("Error retrieving contact requests:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
