# URGENT: GitHub Authentication Fix Required

## Problem
- Local authentication works perfectly (returns admin object with session tokens)
- Production authentication fails with "Invalid credentials" 
- GitHub repository has outdated authentication code
- Git operations locked locally - requires manual GitHub web interface fix

## Solution
Navigate to GitHub repository and update the production.js file:

### 1. Go to GitHub Repository
https://github.com/SharkVelvet/eciple/blob/main/server/production.js

### 2. Find the admin login endpoint (around line 127)
Look for: `app.post("/api/admin/login", async (req, res) => {`

### 3. Replace the ENTIRE admin login endpoint with this working code:

```javascript
app.post("/api/admin/login", async (req, res) => {
  let client;
  try {
    console.log('Admin login attempt for user:', req.body.username);
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.log('Missing username or password');
      return res.status(400).json({ error: "Username and password required" });
    }

    // Get admin user from database
    client = await pool.connect();
    console.log('Database connection established');
    
    const adminResult = await client.query('SELECT id, username, password_hash FROM admin_users WHERE username = $1', [username]);
    console.log('Query result rows:', adminResult.rows.length);
    
    if (adminResult.rows.length === 0) {
      console.log('Admin user not found in database:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const adminUser = adminResult.rows[0];
    console.log('Found admin user:', adminUser.username);
    console.log('Password hash from DB:', adminUser.password_hash);
    
    // Verify password using bcrypt
    console.log('Starting bcrypt comparison...');
    console.log('Input password:', password);
    const isValid = await bcrypt.compare(password, adminUser.password_hash);
    console.log('Bcrypt comparison result:', isValid);
    
    if (!isValid) {
      console.log('Password validation failed for admin:', username);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    await client.query('UPDATE admin_users SET last_login = NOW() WHERE id = $1', [adminUser.id]);

    // Generate session token (64 chars to match local)
    const sessionToken = randomBytes(64).toString('hex');
    console.log('Generated session token for:', username);
    
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
    
    console.log('Admin login successful for:', username);
    res.json({ 
      sessionToken,
      admin: sessionData.admin,
      expiresAt: new Date(sessionData.expires).toISOString()
    });
    
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: "Login failed", details: error.message });
  } finally {
    if (client) {
      client.release();
    }
  }
});
```

### 4. Commit the changes
- Commit message: "Fix admin authentication - return admin object instead of user"
- Kinsta will auto-deploy the changes

### 5. Test after deployment
Wait 2-3 minutes, then test:
```bash
curl -X POST https://eciple-kin-05g9p.kinsta.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "eciple_admin_2024", "password": "EcipleSecure2024Admin!@#$%^&*()_+"}'
```

Should return admin object with sessionToken instead of "Invalid credentials"

## Current Status
✅ Main site working (rollback successful)
✅ EcipleMatch documents API working (3 documents served)
✅ Database connectivity confirmed
✅ Local authentication working perfectly
❌ Production authentication needs this GitHub fix

## Admin Credentials
- Username: eciple_admin_2024
- Password: EcipleSecure2024Admin!@#$%^&*()_+