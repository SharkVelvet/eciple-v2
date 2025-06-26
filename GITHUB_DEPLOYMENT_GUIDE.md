# GitHub Deployment Guide - Fix Admin Authentication

## Problem Identified
Your GitHub file has the OLD version that returns `user` object instead of `admin` object.

## Critical Differences:

### OLD (In GitHub - BROKEN):
```javascript
res.json({ 
  sessionToken,
  user: { 
    id: adminUser.id, 
    username: adminUser.username 
  }
});
```

### NEW (Working Version - NEEDED):
```javascript
// Update last login
await client.query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [adminUser.id]);

// Generate session token (64 chars to match local)
const sessionToken = randomBytes(64).toString('hex');

// Store session with admin structure matching local
const sessionData = {
  admin: { 
    id: adminUser.id, 
    username: adminUser.username,
    email: "admin@eciple.com",
    role: "admin",
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: adminUser.created_at,
    updatedAt: adminUser.updated_at
  },
  expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
};
activeSessions.set(sessionToken, sessionData);

res.json({ 
  sessionToken,
  admin: sessionData.admin,
  expiresAt: new Date(sessionData.expires).toISOString()
});
```

## Deploy Steps:
1. Go to: https://github.com/SharkVelvet/eciple/edit/main/server/production.js
2. Replace the admin login endpoint (lines ~110-175) with the fixed version
3. Commit changes
4. Force redeploy in Kinsta

## Alternative: Replace Entire File
Use the complete file content from FIXED_PRODUCTION_JS.txt