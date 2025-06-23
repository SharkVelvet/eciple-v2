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
    // Pre-computed bcrypt hash for password 'password123'
    // Generated with: bcrypt.hash('password123', 12)
    const passwordHash = '$2b$12$c2DVCeNZJDoEIc/OnfLAGunurnzgBo.t9MbcLytg9ynTJyUvKv/9m';
    
    const defaultAdmin: AdminUser = {
      id: this.currentAdminId++,
      username: 'admin',
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
        subtitle: "Comprehensive overview of eciple's mission and market opportunity",
        filename: "eciple-executive-summary.pdf",
        linkUrl: null,
        description: "Detailed executive summary covering our vision, market opportunity, and growth strategy",
        displayOrder: 1
      },
      {
        title: "Pitch Deck",
        subtitle: "Detailed presentation of our discipleship platform solution",
        filename: "eciple-pitch-deck.pdf",
        linkUrl: null,
        description: "Complete investor presentation showcasing our platform and market opportunity",
        displayOrder: 2
      },
      {
        title: "Financial Projections",
        subtitle: "Revenue forecasts and investment return analysis",
        filename: "eciple-financial-projections.pdf",
        linkUrl: null,
        description: "Detailed financial models and investment return projections",
        displayOrder: 3
      },
      {
        title: "Market Analysis",
        subtitle: "In-depth analysis of the discipleship technology market",
        filename: "eciple-market-analysis.pdf",
        linkUrl: null,
        description: "Comprehensive market research and competitive landscape analysis",
        displayOrder: 4
      },
      {
        title: "Product Demo Guide",
        subtitle: "Step-by-step guide to eciple platform features",
        filename: "eciple-product-demo.pdf",
        linkUrl: null,
        description: "Interactive guide showcasing key platform capabilities and user experience",
        displayOrder: 5
      },
      {
        title: "Technical Specifications",
        subtitle: "Platform architecture and technology overview",
        filename: "eciple-technical-specs.pdf",
        linkUrl: null,
        description: "Technical documentation covering architecture, security, and scalability",
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
      subtitle: insertDocument.subtitle || null,
      linkUrl: insertDocument.linkUrl || null,
      description: insertDocument.description || null,
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

export const storage = new MemStorage();
