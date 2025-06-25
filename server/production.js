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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

// Simple in-memory storage for production
const storage = {
  users: new Map(),
  adminUsers: new Map(),
  adminSessions: new Map(),
  currentUserId: 1,
  currentAdminId: 1,

  async getUserByUsername(username) {
    for (const user of this.users.values()) {
      if (user.username === username) return user;
    }
    return undefined;
  },

  async createUser(userData) {
    const user = { ...userData, id: this.currentUserId++ };
    this.users.set(user.id, user);
    return user;
  },

  async getAdminByUsername(username) {
    for (const admin of this.adminUsers.values()) {
      if (admin.username === username) return admin;
    }
    return undefined;
  },

  async createAdminUser(adminData) {
    const admin = { ...adminData, id: this.currentAdminId++ };
    this.adminUsers.set(admin.id, admin);
    return admin;
  }
};

// Initialize default admin
const defaultAdmin = {
  id: 1,
  username: "discipleship_admin_2024",
  password: "$2b$12$vKzQ8nF2mL9pR6sT4wX3eO.hY1nC7bA9fG5jK8sL2mN4pQ6rS8tU2v", // Ultra-secure password hash
  email: "admin@eciple.com",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastLoginAt: null
};
storage.adminUsers.set(1, defaultAdmin);

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
    secure: process.env.NODE_ENV === 'production',
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
    const user = storage.users.get(id);
    done(null, user);
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

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.json({
    message: "Login successful",
    user: { id: req.user.id, username: req.user.username }
  });
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