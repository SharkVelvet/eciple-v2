import { 
  users, 
  contactRequests, 
  adminUsers, 
  adminSessions, 
  ecipleMatchDocuments,
  type User, 
  type InsertUser, 
  type ContactRequest, 
  type InsertContactRequest,
  type AdminUser,
  type InsertAdminUser,
  type AdminSession,
  type EcipleMatchDocument,
  type InsertEcipleMatchDocument
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form related methods
  createContactRequest(contactData: InsertContactRequest): Promise<ContactRequest>;
  getContactRequest(id: number): Promise<ContactRequest | undefined>;
  getAllContactRequests(): Promise<ContactRequest[]>;

  // Admin authentication methods
  getAdminByUsername(username: string): Promise<AdminUser | undefined>;
  getAdminById(id: number): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminLastLogin(id: number): Promise<void>;
  
  // Admin session methods
  createAdminSession(sessionId: string, userId: number, expiresAt: Date): Promise<AdminSession>;
  getAdminSession(sessionId: string): Promise<AdminSession | undefined>;
  deleteAdminSession(sessionId: string): Promise<void>;
  cleanExpiredSessions(): Promise<void>;

  // EcipleMatch document methods
  getEcipleMatchDocuments(): Promise<EcipleMatchDocument[]>;
  createEcipleMatchDocument(document: InsertEcipleMatchDocument): Promise<EcipleMatchDocument>;
  updateEcipleMatchDocument(id: number, document: Partial<InsertEcipleMatchDocument>): Promise<EcipleMatchDocument | undefined>;
  deleteEcipleMatchDocument(id: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactRequest>;
  private adminUsers: Map<number, AdminUser>;
  private adminSessions: Map<string, AdminSession>;
  private ecipleMatchDocuments: Map<number, EcipleMatchDocument>;
  currentUserId: number;
  currentContactId: number;
  currentAdminId: number;
  currentDocumentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.adminUsers = new Map();
    this.adminSessions = new Map();
    this.ecipleMatchDocuments = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
    this.currentAdminId = 1;
    this.currentDocumentId = 1;

    // Initialize with default admin user (securely hashed password)
    this.initializeDefaultAdmin();
    this.initializeDefaultDocuments();
  }

  private initializeDefaultAdmin() {
    // Ultra-secure admin credentials
    // Username: eciple_admin_2024
    // Password: EcipleSecure2024Admin!@#$%^&*()_+
    const passwordHash = '$2b$10$PKU6yrkB7QrZQxl0gR1NDeqVKbUdcVk3kYr3BtKHAktpv/dMEid.6';
    
    const defaultAdmin: AdminUser = {
      id: this.currentAdminId++,
      username: 'eciple_admin_2024',
      passwordHash: passwordHash,
      email: 'admin@eciple.com',
      role: 'admin',
      isActive: true,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);
  }

  private initializeDefaultDocuments() {
    const defaultDocs = [
      {
        title: "Executive Summary",
        filename: "eciple-executive-summary.pdf",
        description: "Detailed executive summary covering our vision, market opportunity, and growth strategy",
        fileData: null,
        contentType: null,
        fileSize: null,
        displayOrder: 1
      },
      {
        title: "Pitch Deck",
        filename: "eciple-pitch-deck.pdf",
        description: "Complete investor presentation showcasing our platform and market opportunity",
        fileData: null,
        contentType: null,
        fileSize: null,
        displayOrder: 2
      },
      {
        title: "Financial Projections",
        filename: "eciple-financial-projections.pdf",
        description: "Detailed financial models and investment return projections",
        fileData: null,
        contentType: null,
        fileSize: null,
        displayOrder: 3
      },
      {
        title: "Market Analysis",
        filename: "eciple-market-analysis.pdf",
        description: "Comprehensive market research and competitive landscape analysis",
        fileData: null,
        contentType: null,
        fileSize: null,
        displayOrder: 4
      },
      {
        title: "Product Demo Guide",
        filename: "eciple-product-demo.pdf",
        description: "Interactive guide showcasing key platform capabilities and user experience",
        fileData: null,
        contentType: null,
        fileSize: null,
        displayOrder: 5
      },
      {
        title: "Technical Specifications",
        filename: "eciple-technical-specs.pdf",
        description: "Technical documentation covering architecture, security, and scalability",
        fileData: null,
        contentType: null,
        fileSize: null,
        displayOrder: 6
      }
    ];

    defaultDocs.forEach(doc => {
      const document: EcipleMatchDocument = {
        id: this.currentDocumentId++,
        ...doc,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.ecipleMatchDocuments.set(document.id, document);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactRequest(contactData: InsertContactRequest): Promise<ContactRequest> {
    const id = this.currentContactId++;
    const timestamp = new Date();
    const contactRequest: ContactRequest = { 
      ...contactData, 
      id,
      message: contactData.message || null,
      phone: contactData.phone || null,
      churchSize: contactData.churchSize || null,
      createdAt: timestamp
    };
    this.contacts.set(id, contactRequest);
    return contactRequest;
  }

  async getContactRequest(id: number): Promise<ContactRequest | undefined> {
    return this.contacts.get(id);
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return Array.from(this.contacts.values());
  }

  // Admin authentication methods
  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (admin) => admin.username === username && admin.isActive
    );
  }

  async getAdminById(id: number): Promise<AdminUser | undefined> {
    const admin = this.adminUsers.get(id);
    return admin && admin.isActive ? admin : undefined;
  }

  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminId++;
    const admin: AdminUser = {
      ...insertAdmin,
      id,
      role: insertAdmin.role || 'admin',
      isActive: true,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.adminUsers.set(id, admin);
    return admin;
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    const admin = this.adminUsers.get(id);
    if (admin) {
      admin.lastLogin = new Date();
      admin.updatedAt = new Date();
      this.adminUsers.set(id, admin);
    }
  }

  // Admin session methods
  async createAdminSession(sessionId: string, userId: number, expiresAt: Date): Promise<AdminSession> {
    const session: AdminSession = {
      id: sessionId,
      userId,
      expiresAt,
      createdAt: new Date(),
    };
    this.adminSessions.set(sessionId, session);
    return session;
  }

  async getAdminSession(sessionId: string): Promise<AdminSession | undefined> {
    const session = this.adminSessions.get(sessionId);
    if (session && session.expiresAt > new Date()) {
      return session;
    }
    if (session) {
      this.adminSessions.delete(sessionId);
    }
    return undefined;
  }

  async deleteAdminSession(sessionId: string): Promise<void> {
    this.adminSessions.delete(sessionId);
  }

  async cleanExpiredSessions(): Promise<void> {
    const now = new Date();
    const sessionsToDelete: string[] = [];
    this.adminSessions.forEach((session, sessionId) => {
      if (session.expiresAt <= now) {
        sessionsToDelete.push(sessionId);
      }
    });
    sessionsToDelete.forEach(sessionId => {
      this.adminSessions.delete(sessionId);
    });
  }

  // EcipleMatch document methods
  async getEcipleMatchDocuments(): Promise<EcipleMatchDocument[]> {
    return Array.from(this.ecipleMatchDocuments.values())
      .filter(doc => doc.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  }

  async createEcipleMatchDocument(insertDocument: InsertEcipleMatchDocument): Promise<EcipleMatchDocument> {
    const id = this.currentDocumentId++;
    const document: EcipleMatchDocument = {
      ...insertDocument,
      id,
      description: insertDocument.description || null,
      fileData: insertDocument.fileData || null,
      contentType: insertDocument.contentType || null,
      fileSize: insertDocument.fileSize || null,
      displayOrder: insertDocument.displayOrder || 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.ecipleMatchDocuments.set(id, document);
    return document;
  }

  async updateEcipleMatchDocument(id: number, updates: Partial<InsertEcipleMatchDocument>): Promise<EcipleMatchDocument | undefined> {
    const document = this.ecipleMatchDocuments.get(id);
    if (document) {
      const updatedDocument = {
        ...document,
        ...updates,
        updatedAt: new Date(),
      };
      this.ecipleMatchDocuments.set(id, updatedDocument);
      return updatedDocument;
    }
    return undefined;
  }

  async deleteEcipleMatchDocument(id: number): Promise<void> {
    const document = this.ecipleMatchDocuments.get(id);
    if (document) {
      document.isActive = false;
      document.updatedAt = new Date();
      this.ecipleMatchDocuments.set(id, document);
    }
  }
}

// Database storage implementation for production
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContactRequest(contactData: InsertContactRequest): Promise<ContactRequest> {
    const [contact] = await db
      .insert(contactRequests)
      .values(contactData)
      .returning();
    return contact;
  }

  async getContactRequest(id: number): Promise<ContactRequest | undefined> {
    const [contact] = await db.select().from(contactRequests).where(eq(contactRequests.id, id));
    return contact || undefined;
  }

  async getAllContactRequests(): Promise<ContactRequest[]> {
    return await db.select().from(contactRequests);
  }

  async getAdminByUsername(username: string): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return admin || undefined;
  }

  async getAdminById(id: number): Promise<AdminUser | undefined> {
    const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
    return admin || undefined;
  }

  async createAdminUser(insertAdmin: InsertAdminUser): Promise<AdminUser> {
    const [admin] = await db
      .insert(adminUsers)
      .values(insertAdmin)
      .returning();
    return admin;
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, id));
  }

  async createAdminSession(sessionId: string, userId: number, expiresAt: Date): Promise<AdminSession> {
    const [session] = await db
      .insert(adminSessions)
      .values({
        id: sessionId,
        userId,
        expiresAt
      })
      .returning();
    return session;
  }

  async getAdminSession(sessionId: string): Promise<AdminSession | undefined> {
    const [session] = await db.select().from(adminSessions).where(eq(adminSessions.id, sessionId));
    return session || undefined;
  }

  async deleteAdminSession(sessionId: string): Promise<void> {
    await db.delete(adminSessions).where(eq(adminSessions.id, sessionId));
  }

  async cleanExpiredSessions(): Promise<void> {
    const now = new Date();
    await db.delete(adminSessions).where(eq(adminSessions.expiresAt, now));
  }

  async getEcipleMatchDocuments(): Promise<EcipleMatchDocument[]> {
    return await db.select().from(ecipleMatchDocuments);
  }

  async createEcipleMatchDocument(insertDocument: InsertEcipleMatchDocument): Promise<EcipleMatchDocument> {
    const [document] = await db
      .insert(ecipleMatchDocuments)
      .values(insertDocument)
      .returning();
    return document;
  }

  async updateEcipleMatchDocument(id: number, updates: Partial<InsertEcipleMatchDocument>): Promise<EcipleMatchDocument | undefined> {
    const [document] = await db
      .update(ecipleMatchDocuments)
      .set(updates)
      .where(eq(ecipleMatchDocuments.id, id))
      .returning();
    return document || undefined;
  }

  async deleteEcipleMatchDocument(id: number): Promise<void> {
    await db
      .update(ecipleMatchDocuments)
      .set({ isActive: false })
      .where(eq(ecipleMatchDocuments.id, id));
  }
}

// Use database storage for production, memory storage for development
export const storage = process.env.NODE_ENV === 'production' 
  ? new DatabaseStorage() 
  : new MemStorage();
