import { db } from "./db";
import { adminUsers, ecipleMatchDocuments } from "@shared/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

async function initializeDatabase() {
  try {
    console.log("Initializing database...");

    // Check if admin user already exists
    const existingAdmin = await db.select().from(adminUsers).where(eq(adminUsers.username, "eciple_admin_2024"));
    
    if (existingAdmin.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash("EcipleSecure2024Admin!@#$%^&*()_+", 12);
      
      const [newAdmin] = await db.insert(adminUsers).values({
        username: "eciple_admin_2024",
        passwordHash: hashedPassword,
        email: "admin@eciple.com",
        isActive: true,
      }).returning();
      
      console.log("✓ Default admin user created");
    } else {
      console.log("✓ Admin user already exists");
    }

    // Check if default documents exist
    const existingDocs = await db.select().from(ecipleMatchDocuments);
    
    if (existingDocs.length === 0) {
      // Create default documents
      const defaultDocs = [
        {
          title: "Executive Summary",
          filename: "executive-summary.pdf",
          description: "Comprehensive overview of eciple's vision, market opportunity, and business strategy",
          displayOrder: 0,
          isActive: true
        },
        {
          title: "Pitch Deck",
          filename: "eciple-pitch-deck.pdf", 
          description: "Detailed presentation outlining eciple's innovative discipleship platform",
          displayOrder: 1,
          isActive: true
        },
        {
          title: "Financial Projections",
          filename: "financial-projections.pdf",
          description: "Revenue forecasts and growth projections for the next 5 years",
          displayOrder: 2,
          isActive: false
        }
      ];

      for (const doc of defaultDocs) {
        await db.insert(ecipleMatchDocuments).values(doc);
      }
      
      console.log("✓ Default documents created");
    } else {
      console.log("✓ Documents already exist");
    }

    console.log("Database initialization complete!");
    
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}

// Auto-initialize database when DATABASE_URL is present
if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  initializeDatabase().catch(error => {
    console.error('Database initialization failed:', error);
  });
}

export { initializeDatabase };