import { eq } from "drizzle-orm";
import { db } from "./db.js";
import { 
  adminUsers, 
  adminSessions, 
  ecipleDocuments, 
  contactRequests,
  type AdminUser,
  type InsertAdminUser,
  type AdminSession,
  type InsertAdminSession,
  type EcipleDocument,
  type InsertEcipleDocument,
  type ContactRequest,
  type InsertContactRequest
} from "../shared/schema.js";

export interface IStorage {
  // Admin user operations
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminById(id: number): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminLastLogin(id: number): Promise<void>;
  
  // Admin session operations
  createAdminSession(sessionId: string, userId: number, expiresAt: Date): Promise<AdminSession>;
  getAdminSession(sessionId: string): Promise<AdminSession | undefined>;
  deleteAdminSession(sessionId: string): Promise<void>;
  
  // Document operations
  getEcipleDocuments(): Promise<EcipleDocument[]>;
  createEcipleDocument(document: InsertEcipleDocument): Promise<EcipleDocument>;
  updateEcipleDocument(id: number, document: Partial<InsertEcipleDocument>): Promise<EcipleDocument | undefined>;
  deleteEcipleDocument(id: number): Promise<void>;
  
  // Contact operations
  createContactRequest(contact: InsertContactRequest): Promise<ContactRequest>;
  getAllContactRequests(): Promise<ContactRequest[]>;
}

export class DatabaseStorage implements IStorage {
  // Admin user operations
  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin;
  }

  async getAdminById(id: number): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return admin;
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const [admin] = await db.insert(adminUsers).values(user).returning();
    return admin;
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db.update(adminUsers).set({ lastLogin: new Date() }).where(eq(adminUsers.id, id));
  }

  // Admin session operations
  async createAdminSession(sessionId: string, userId: number, expiresAt: Date): Promise<AdminSession> {
    const [session] = await db.insert(adminSessions).values({
      id: sessionId,
      userId,
      expiresAt
    }).returning();
    return session;
  }

  async getAdminSession(sessionId: string): Promise<AdminSession | undefined> {
    const [session] = await db.select().from(adminSessions).where(eq(adminSessions.id, sessionId));
    return session;
  }

  async deleteAdminSession(sessionId: string): Promise<void> {
    await db.delete(adminSessions).where(eq(adminSessions.id, sessionId));
  }

  // Document operations
  async getEcipleDocuments(): Promise<EcipleDocument[]> {
    return await db.select().from(ecipleDocuments).where(eq(ecipleDocuments.isActive, true));
  }

  async createEcipleDocument(document: InsertEcipleDocument): Promise<EcipleDocument> {
    const [doc] = await db.insert(ecipleDocuments).values({
      ...document,
      updatedAt: new Date()
    }).returning();
    return doc;
  }

  async updateEcipleDocument(id: number, document: Partial<InsertEcipleDocument>): Promise<EcipleDocument | undefined> {
    const [doc] = await db.update(ecipleDocuments).set({
      ...document,
      updatedAt: new Date()
    }).where(eq(ecipleDocuments.id, id)).returning();
    return doc;
  }

  async deleteEcipleDocument(id: number): Promise<void> {
    await db.delete(ecipleDocuments).where(eq(ecipleDocuments.id, id));
  }

  // Contact operations
  async createContactRequest(contact: InsertContactRequest): Promise<ContactRequest> {
    const [request] = await db.insert(contactRequests).values(contact).returning();
    return request;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return await db.select().from(contactRequests);
  }
}

export const storage = new DatabaseStorage();