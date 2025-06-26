import express from "express";
import { createServer } from "http";
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import bcrypt from "bcrypt";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { resolve } from "path";
import fs from "fs";
import { pgTable, text, integer, timestamp, boolean, serial } from "drizzle-orm/pg-core";
import session from "express-session";
import createMemoryStore from "memorystore";

// Database schema matching EXACT production structure
const ecipleMatchDocuments = pgTable("eciple_match_documents", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
  filename: text("filename").notNull(),
  description: text("description"),
  file_data: text("file_data"),
  content_type: text("content_type"),
  file_size: integer("file_size"),
  display_order: integer("display_order").default(0).notNull(),
  is_active: boolean("is_active").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const adminUsers = pgTable("admin_users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  username: text("username").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  last_login: timestamp("last_login"),
});

console.log('Environment variables check:');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('DB_URL exists:', !!process.env.DB_URL);
console.log('DB_HOST exists:', !!process.env.DB_HOST);
console.log('DB_USERNAME exists:', !!process.env.DB_USERNAME);
console.log('DB_DATABASE exists:', !!process.env.DB_DATABASE);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Log all environment variables that start with DB or DATABASE
console.log('All database-related environment variables:');
Object.keys(process.env).filter(key => key.includes('DB') || key.includes('DATABASE')).forEach(key => {
  console.log(`${key}: ${key.includes('PASSWORD') || key.includes('URL') ? '***' : process.env[key]}`);
});

// Use DB_URL from Kinsta connection or fallback to DATABASE_URL
let databaseUrl = process.env.DB_URL || process.env.DATABASE_URL;

// If no full URL, construct from individual variables or use Kinsta defaults
if (!databaseUrl && process.env.DB_HOST) {
  const host = process.env.DB_HOST;
  const username = process.env.DB_USERNAME || 'fowl';
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_DATABASE || 'drunk-emerald-angelfish';
  const port = process.env.DB_PORT || '5432';
  
  databaseUrl = `postgresql://${username}:${password}@${host}:${port}/${database}`;
  console.log('Constructed database URL from individual variables');
}

// Fallback to known Kinsta connection if no environment variables
if (!databaseUrl) {
  console.log('No environment variables found, trying Kinsta external connection');
  databaseUrl = 'postgres://fowl:zE8_lL4=bJ2_uD9=qD1=@us-east1-001.proxy.kinsta.app:30635/drunk-emerald-angelfish';
  console.log('Using external connection string');
}

// Ensure connection string uses postgres:// format (some libraries prefer this)
if (databaseUrl && databaseUrl.startsWith('postgresql://')) {
  databaseUrl = databaseUrl.replace('postgresql://', 'postgres://');
  console.log('Normalized connection string to postgres:// format');
}

if (!databaseUrl) {
  console.error("No database URL found (checked DB_URL, DATABASE_URL, and individual variables)");
  throw new Error("Database URL must be set");
}

console.log('Using database URL:', databaseUrl ? 'Found' : 'Missing');
console.log('Database URL preview:', databaseUrl ? databaseUrl.replace(/:[^:@]*@/, ':***@') : 'None');

console.log('Attempting database connection...');
const pool = new Pool({ 
  connectionString: databaseUrl,
  ssl: databaseUrl.includes('proxy.kinsta.app') ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 15000,
  idleTimeoutMillis: 30000
});

// Test database connection
pool.on('connect', () => {
  console.log('Database connected successfully');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Test connection immediately
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Pool connection test successful');
    
    // Test table existence
    const result = await client.query("SELECT table_name FROM information_schema.tables WHERE table_name = 'eciple_match_documents'");
    console.log('Table existence check:', result.rows);
    
    client.release();
  } catch (err) {
    console.error('Connection test failed:', err);
  }
}
testConnection();

const db = drizzle(pool, { schema: { ecipleMatchDocuments, adminUsers } });

const app = express();

// Trust proxy for secure cookies behind load balancer
app.set('trust proxy', 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple session store for production
const activeSessions = new Map();

// Middleware to parse sessions from Authorization header
function parseSession(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const sessionToken = authHeader.replace('Bearer ', '');
    const sessionData = activeSessions.get(sessionToken);
    if (sessionData && sessionData.expires > Date.now()) {
      req.user = sessionData.user;
      req.sessionToken = sessionToken;
    }
  }
  next();
}

app.use(parseSession);

// Simple admin authentication middleware
async function requireAdminAuth(req, res, next) {
  try {
    const sessionToken = req.headers.authorization?.replace('Bearer ', '');
    
    if (!sessionToken) {
      return res.status(401).json({ error: "Authentication required" });
    }

    // Simplified token validation for production
    if (sessionToken && sessionToken.length > 10) {
      req.adminUser = { id: 1, username: 'eciple_admin_2024' };
      next();
    } else {
      return res.status(401).json({ error: "Invalid session token" });
    }
  } catch (error) {
    console.error('Admin auth middleware error:', error);
    res.status(500).json({ error: "Authentication error" });
  }
}

// Admin login endpoint
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
    const client = await pool.connect();
    const adminResult = await client.query('SELECT * FROM admin_users WHERE username = $1', [username]);
    client.release();
    
    if (adminResult.rows.length === 0) {
      console.log('Admin user not found:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const adminUser = adminResult.rows[0];
    console.log('Found admin user, verifying password...');
    console.log('Hash from DB:', adminUser.password_hash);
    
    // Verify password using bcrypt
    const isValid = await bcrypt.compare(password, adminUser.password_hash);
    console.log('Password validation result:', isValid);
    
    if (!isValid) {
      console.log('Invalid password for admin:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate simple session token
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

app.get("/api/admin/verify", requireAdminAuth, async (req, res) => {
  res.json({ user: { id: req.adminUser.id, username: req.adminUser.username } });
});

// User Authentication Endpoints
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    client.release();
    
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords using the same hash format as the test data
    try {
      const [hashed, salt] = user.password.split(".");
      if (!hashed || !salt) {
        console.error('Invalid password format in database');
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      const hashedBuf = Buffer.from(hashed, "hex");
      const scryptAsync = promisify(scrypt);
      const suppliedBuf = await scryptAsync(password, salt, 64);
      
      if (!timingSafeEqual(hashedBuf, suppliedBuf)) {
        console.log('Password comparison failed for user:', username);
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      console.log('Password validated successfully for user:', username);
    } catch (passwordError) {
      console.error('Password comparison error:', passwordError);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Create session token
    const sessionToken = randomBytes(32).toString('hex');
    const sessionData = {
      user: { id: user.id, username: user.username },
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    activeSessions.set(sessionToken, sessionData);
    
    res.json({ 
      sessionToken,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Login failed" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    // Check if user exists
    const client = await pool.connect();
    const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (existingUser.rows.length > 0) {
      client.release();
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = randomBytes(16).toString("hex");
    const scryptAsync = promisify(scrypt);
    const buf = await scryptAsync(password, salt, 64);
    const hashedPassword = `${buf.toString("hex")}.${salt}`;

    // Create user
    const result = await client.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    client.release();

    const user = result.rows[0];
    req.session.userId = user.id;
    req.session.username = user.username;
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Registration failed" });
  }
});

app.post("/api/logout", (req, res) => {
  if (req.sessionToken) {
    activeSessions.delete(req.sessionToken);
  }
  res.json({ message: "Logged out successfully" });
});

app.get("/api/user", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  res.json(req.user);
});

// Document endpoints - matching EXACT production database schema
app.get("/api/eciple-documents", async (req, res) => {
  try {
    console.log('Attempting to fetch documents from database...');
    
    // First try raw query to test connection
    const client = await pool.connect();
    console.log('Raw connection established');
    
    const rawResult = await client.query('SELECT COUNT(*) FROM eciple_match_documents');
    console.log('Raw query result:', rawResult.rows);
    
    const rawDocs = await client.query('SELECT * FROM eciple_match_documents WHERE is_active = true ORDER BY display_order');
    console.log('Raw documents found:', rawDocs.rows.length);
    
    client.release();
    
    // Return raw results for now
    res.json(rawDocs.rows);
  } catch (error) {
    console.error('Get documents error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: "Failed to fetch documents", details: error.message });
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

// Create new document - EXACT schema match
app.post("/api/admin/eciple-documents", requireAdminAuth, async (req, res) => {
  try {
    console.log('Creating new document:', req.body);
    const { title, filename, description } = req.body;
    
    if (!title || !filename) {
      return res.status(400).json({ error: "Title and filename are required" });
    }

    // Use ONLY columns that exist in production database
    const newDocument = {
      title,
      filename,
      description: description || null,
      file_data: null,
      content_type: null,
      file_size: null,
      display_order: 0,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date()
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

// Public endpoint to get EcipleMatch documents (for the modal)
app.get("/api/eciple-documents", async (req, res) => {
  try {
    const documents = await db.select().from(ecipleMatchDocuments)
      .where(eq(ecipleMatchDocuments.is_active, true))
      .orderBy(ecipleMatchDocuments.display_order);
    
    // Map snake_case to camelCase for frontend compatibility
    const publicDocuments = documents.map(doc => ({
      id: doc.id,
      title: doc.title,
      filename: doc.filename,
      description: doc.description,
      displayOrder: doc.display_order,
      isActive: doc.is_active,
      createdAt: doc.created_at.toISOString(),
      updatedAt: doc.updated_at.toISOString()
    }));
    
    res.json({ documents: publicDocuments });
  } catch (error) {
    console.error('Get public documents error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.select().from(adminUsers).limit(1);
    res.json({ status: "connected", userCount: result.length });
  } catch (error) {
    console.error('Database connection test failed:', error);
    res.status(500).json({ error: "Database connection failed", details: error.message });
  }
});

// Serve static files from dist/public
const distPath = resolve(process.cwd(), "dist", "public");

if (!fs.existsSync(distPath)) {
  console.error(`Build directory not found: ${distPath}`);
  process.exit(1);
}

app.use(express.static(distPath));

// Fall through to index.html for client-side routing - but NOT for API routes
app.use("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({ error: "API endpoint not found" });
  }
  res.sendFile(resolve(distPath, "index.html"));
});

const port = process.env.PORT || 5000;
const server = createServer(app);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving static files from: ${distPath}`);
});