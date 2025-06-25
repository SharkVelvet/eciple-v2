import { pgTable, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  username: text("username").unique().notNull(),
  password_hash: text("password_hash").notNull(),
  email: text("email"),
  role: text("role").default('admin'),
  is_active: boolean("is_active").default(true).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  last_login: timestamp("last_login"),
});

export const adminSessions = pgTable("admin_sessions", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  sessionId: text("session_id").unique().notNull(),
  userId: integer("user_id").references(() => adminUsers.id).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ecipleMatchDocuments = pgTable("eciple_match_documents", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  filename: text("filename").notNull(),
  description: text("description"),
  fileData: text("file_data"),
  contentType: text("content_type"),
  fileSize: integer("file_size"),
  linkUrl: text("link_url"),
  displayOrder: integer("display_order").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});