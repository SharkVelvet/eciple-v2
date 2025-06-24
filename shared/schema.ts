import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact request model
export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  churchName: text("church_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  churchSize: text("church_size"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).pick({
  firstName: true,
  lastName: true,
  churchName: true,
  email: true,
  phone: true,
  churchSize: true,
  message: true,
});

export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;

// Admin users table for secure authentication
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  role: varchar("role", { length: 20 }).notNull().default("admin"),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).pick({
  username: true,
  passwordHash: true,
  email: true,
  role: true,
});

export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

// EcipleMatch documents table
export const ecipleMatchDocuments = pgTable("eciple_match_documents", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  filename: varchar("filename", { length: 255 }).notNull(),
  description: text("description"),
  fileData: text("file_data"), // Base64 encoded file content
  contentType: varchar("content_type", { length: 100 }),
  fileSize: integer("file_size"),
  displayOrder: integer("display_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertEcipleMatchDocumentSchema = createInsertSchema(ecipleMatchDocuments).pick({
  title: true,
  subtitle: true,
  filename: true,
  linkUrl: true,
  description: true,
  displayOrder: true,
});

export type InsertEcipleMatchDocument = z.infer<typeof insertEcipleMatchDocumentSchema>;
export type EcipleMatchDocument = typeof ecipleMatchDocuments.$inferSelect;

// Admin sessions table for secure session management
export const adminSessions = pgTable("admin_sessions", {
  id: varchar("id", { length: 128 }).primaryKey(),
  userId: integer("user_id").notNull().references(() => adminUsers.id),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type AdminSession = typeof adminSessions.$inferSelect;
