import { db } from "./db.js";
import { adminUsers } from "../shared/schema.js";
import { hashPassword } from "./auth.js";
import { eq } from "drizzle-orm";

export async function initializeDatabase() {
  try {
    console.log("Initializing database...");
    
    // Check if admin user already exists
    const existingAdmin = await db.select().from(adminUsers).where(eq(adminUsers.username, "admin"));
    
    if (existingAdmin.length === 0) {
      // Create default admin user
      const defaultPassword = "admin123";
      const hashedPassword = await hashPassword(defaultPassword);
      
      await db.insert(adminUsers).values({
        username: "admin",
        passwordHash: hashedPassword
      });
      
      console.log("Default admin user created: admin/admin123");
    } else {
      console.log("Admin user already exists");
    }
    
    console.log("Database initialization complete");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}