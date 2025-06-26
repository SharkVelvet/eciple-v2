import bcrypt from "bcrypt";
import crypto from "crypto";
import { storage } from "./storage.js";
import type { Request, Response, NextFunction } from "express";

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateSessionId(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.headers.authorization?.replace('Bearer ', '');
  
  if (!sessionId) {
    return res.status(401).json({ error: 'No session token provided' });
  }

  try {
    const session = await storage.getAdminSession(sessionId);
    
    if (!session || session.expiresAt < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    const admin = await storage.getAdminById(session.userId);
    if (!admin) {
      return res.status(401).json({ error: 'Admin not found' });
    }

    (req as any).admin = admin;
    (req as any).sessionId = sessionId;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}