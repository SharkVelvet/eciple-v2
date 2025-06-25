import express from "express";
import { createServer } from "http";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import createMemoryStore from "memorystore";
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { users, adminUsers, adminSessions, ecipleMatchDocuments } from './schema.js';
import { eq } from 'drizzle-orm';
import ws from "ws";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

// Database setup
neonConfig.webSocketConstructor = ws;

let db = null;
if (process.env.DATABASE_URL) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzle(pool, { schema: { users, adminUsers, adminSessions, ecipleMatchDocuments } });
}

// Database storage for production
const storage = {
  async getUserByUsername(username) {
    if (!db) return undefined;
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    } catch (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
  },

  async createUser(userData) {
    if (!db) return null;
    try {
      const [user] = await db.insert(users).values(userData).returning();
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  },

  async getAdminByUsername(username) {
    if (!db) return undefined;
    try {
      const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
      return admin || undefined;
    } catch (error) {
      console.error('Error fetching admin:', error);
      return undefined;
    }
  },

  async createAdminUser(adminData) {
    if (!db) return null;
    try {
      const [admin] = await db.insert(adminUsers).values(adminData).returning();
      return admin;
    } catch (error) {
      console.error('Error creating admin:', error);
      return null;
    }
  }
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Authentication helper functions
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Setup session and passport
const sessionStore = new MemoryStore({ checkPeriod: 86400000 });
const sessionSecret = process.env.SESSION_SECRET || randomBytes(64).toString('hex');

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: false, // Set to false for now to troubleshoot
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await storage.getUserByUsername(username);
    if (!user) return done(null, false, { message: "Invalid username or password" });
    
    const isValid = await comparePasswords(password, user.password);
    if (!isValid) return done(null, false, { message: "Invalid username or password" });
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    if (!db) return done(null, false);
    const [user] = await db.select().from(users).where(eq(users.id, id));
    done(null, user || false);
  } catch (error) {
    done(error);
  }
});

// Auth routes
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await storage.getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    
    const hashedPassword = await hashPassword(password);
    const user = await storage.createUser({
      username,
      password: hashedPassword
    });
    
    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed" });
      res.status(201).json({
        message: "User created successfully",
        user: { id: user.id, username: user.username }
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", (req, res, next) => {
  console.log('Login attempt:', req.body);
  passport.authenticate("local", (err, user, info) => {
    console.log('Auth result:', { err, user, info });
    if (err) {
      console.error('Auth error:', err);
      return res.status(500).json({ message: "Authentication error" });
    }
    if (!user) {
      console.log('Login failed:', info);
      return res.status(401).json({ message: info.message || "Login failed" });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        console.error('Session error:', err);
        return res.status(500).json({ message: "Session error" });
      }
      console.log('Login successful:', user.username);
      res.json({ id: user.id, username: user.username });
    });
  })(req, res, next);
});

app.post("/api/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logout successful" });
  });
});

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ id: req.user.id, username: req.user.username });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Database connection test endpoint (also at /db-test for easy access)
app.get('/db-test', async (req, res) => {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        error: 'DATABASE_URL not found', 
        env: Object.keys(process.env).filter(key => key.includes('DATABASE'))
      });
    }

    const pg = await import('pg');
    const { Pool } = pg.default;
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    const result = await pool.query('SELECT COUNT(*) as user_count FROM users');
    const userCount = result.rows[0].user_count;
    
    await pool.end();

    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api/db-test', async (req, res) => {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ 
        error: 'DATABASE_URL not found', 
        env: Object.keys(process.env).filter(key => key.includes('DATABASE'))
      });
    }

    const pg = await import('pg');
    const { Pool } = pg.default;
    const pool = new Pool({ 
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });

    const result = await pool.query('SELECT COUNT(*) as user_count FROM users');
    const userCount = result.rows[0].user_count;
    
    await pool.end();

    res.json({ 
      success: true, 
      message: 'Database connected successfully',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      timestamp: new Date().toISOString()
    });
  }
});

// Simple admin authentication - using existing admin_users table structure
app.post("/api/admin/login", async (req, res) => {
  try {
    console.log('Admin login attempt:', req.body.username);
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    if (!db) {
      return res.status(500).json({ error: "Database not available" });
    }

    // Get admin user from database
    const [adminUser] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    
    if (!adminUser) {
      console.log('Admin user not found:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log('Found admin user, verifying password...');
    
    // Verify password using bcrypt
    const isValid = await bcrypt.compare(password, adminUser.password_hash);
    
    if (!isValid) {
      console.log('Invalid password for admin:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate simple session token (store in memory for now)
    const sessionToken = randomBytes(32).toString('hex');
    
    console.log('Admin login successful:', username);
    res.json({ 
      sessionToken, 
      user: { 
        id: adminUser.id, 
        username: adminUser.username 
      } 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Simple admin authentication middleware
async function requireAdminAuth(req, res, next) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // For now, just validate that a token exists (simplified approach)
    // In production, you'd want to validate the token properly
    if (sessionToken && sessionToken.length > 10) {
      // Mock admin user for middleware
      req.adminUser = { id: 1, username: 'eciple_admin_2024' };
      next();
    } else {
      return res.status(401).json({ error: "Invalid session" });
    }
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ error: "Authentication error" });
  }
}

app.get("/api/admin/verify", requireAdminAuth, async (req, res) => {
  res.json({ user: { id: req.adminUser.id, username: req.adminUser.username } });
});

// EcipleMatch document endpoints
app.get("/api/eciple-documents", async (req, res) => {
  try {
    const documents = await db.select().from(ecipleMatchDocuments)
      .where(eq(ecipleMatchDocuments.is_active, true))
      .orderBy(ecipleMatchDocuments.display_order);
    res.json(documents);
  } catch (error) {
    console.error('Get documents error:', error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

app.get("/api/admin/eciple-documents", requireAdminAuth, async (req, res) => {
  try {
    const documents = await db.select().from(ecipleMatchDocuments)
      .orderBy(ecipleMatchDocuments.display_order);
    res.json({ documents });
  } catch (error) {
    console.error('Get admin documents error:', error);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Create new document
app.post("/api/admin/eciple-documents", requireAdminAuth, async (req, res) => {
  try {
    console.log('Creating new document:', req.body);
    const { title, filename, description, displayOrder } = req.body;
    
    if (!title || !filename) {
      return res.status(400).json({ error: "Title and filename are required" });
    }

    const newDocument = {
      title,
      filename,
      description: description || null,
      display_order: displayOrder || 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      file_data: null,
      content_type: null,
      file_size: null
    };

    const [document] = await db.insert(ecipleMatchDocuments)
      .values(newDocument)
      .returning();

    console.log('Document created successfully:', document.id);
    res.status(201).json({ document });
  } catch (error) {
    console.error('Create document error:', error);
    res.status(500).json({ error: "Failed to create document", details: error.message });
  }
});

// Update document
app.put("/api/admin/eciple-documents/:id", requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid document ID" });
    }

    const updates = {
      ...req.body,
      updated_at: new Date()
    };

    const [document] = await db.update(ecipleMatchDocuments)
      .set(updates)
      .where(eq(ecipleMatchDocuments.id, id))
      .returning();

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ document });
  } catch (error) {
    console.error('Update document error:', error);
    res.status(500).json({ error: "Failed to update document" });
  }
});

// Delete document
app.delete("/api/admin/eciple-documents/:id", requireAdminAuth, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid document ID" });
    }

    await db.delete(ecipleMatchDocuments)
      .where(eq(ecipleMatchDocuments.id, id));

    res.json({ success: true });
  } catch (error) {
    console.error('Delete document error:', error);
    res.status(500).json({ error: "Failed to delete document" });
  }
});

// Serve static files from dist/public
const distPath = resolve(process.cwd(), "dist", "public");

if (!fs.existsSync(distPath)) {
  console.error(`Build directory not found: ${distPath}`);
  console.error(`Current working directory: ${process.cwd()}`);
  console.error(`Looking for: ${distPath}`);
  
  // Try alternative paths
  const altPath1 = resolve(__dirname, "public");
  const altPath2 = resolve(process.cwd(), "public");
  
  console.error(`Alternative path 1: ${altPath1} exists: ${fs.existsSync(altPath1)}`);
  console.error(`Alternative path 2: ${altPath2} exists: ${fs.existsSync(altPath2)}`);
  
  process.exit(1);
}

app.use(express.static(distPath));

// Fall through to index.html for client-side routing
app.use("*", (_req, res) => {
  res.sendFile(resolve(distPath, "index.html"));
});

const port = process.env.PORT || 5000;
const server = createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving static files from: ${distPath}`);
});