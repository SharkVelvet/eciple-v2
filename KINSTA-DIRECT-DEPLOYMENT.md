# Kinsta Direct Deployment - Bypass GitHub

## Problem
Git push returns "Invalid credentials" - GitHub auth issue blocking deployment.

## Direct Kinsta Solutions:

### Method 1: Kinsta File Manager (Recommended)
1. Login to MyKinsta dashboard
2. Navigate to: Applications → eciple → File Manager
3. Browse to: `server/production.js`
4. Click "Edit" or upload replacement file
5. Copy entire content from this Replit's `server/production.js`
6. Save changes
7. Restart application from Kinsta dashboard

### Method 2: Kinsta Terminal
1. In MyKinsta dashboard
2. Go to Applications → eciple → Terminal
3. Run commands:
```bash
cd /app
# Create backup
cp server/production.js server/production.js.backup
# Update file (you'll need to paste content)
nano server/production.js
# Restart service
pm2 restart all
```

### Method 3: Force Redeploy
1. MyKinsta → Applications → eciple → Deployments
2. Click "Redeploy" button
3. This forces fresh deployment from GitHub

## Test Success:
```bash
curl -X POST https://eciple-kin-05g9p.kinsta.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "eciple_admin_2024", "password": "EcipleSecure2024Admin!@#$%^&*()_+"}'
```

Success = Returns session token instead of "Invalid credentials"