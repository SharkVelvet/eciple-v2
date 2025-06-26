# Manual Deployment Instructions for Admin Authentication Fix

## Current Status
✅ Admin login works locally with credentials:
- Username: `eciple_admin_2024`
- Password: `EcipleSecure2024Admin!@#$%^&*()_+`

❌ Production server still has old authentication code

## Manual Deployment Steps

### Option 1: Command Line (Recommended)
1. Open your terminal and run:
```bash
rm -f .git/index.lock
rm -f .git/objects/*/tmp_obj_*
git add server/production.js replit.md
git commit -m "Deploy admin authentication fix"
git push origin main
```

2. Redeploy your Kinsta application after the push completes.

### Option 2: GitHub Web Interface
1. Go to your GitHub repository: https://github.com/SharkVelvet/eciple
2. Navigate to `server/production.js`
3. Replace the entire file contents with the fixed version (see below)
4. Commit the changes
5. Redeploy on Kinsta

### Option 3: Direct File Upload
1. Download the fixed `server/production.js` from this Replit
2. Upload it directly to your GitHub repository
3. Commit and redeploy

## What the Fix Does
- Properly connects to Kinsta Database
- Validates admin password using bcrypt
- Generates secure session tokens
- Handles authentication errors correctly
- Includes detailed logging for debugging

## After Deployment
1. Visit: https://eciple-kin-05g9p.kinsta.app/admin-login
2. Enter your credentials
3. You'll be redirected to the admin dashboard
4. You can manage EcipleMatch documents

## Verification
Test the login with a curl command:
```bash
curl -X POST https://eciple-kin-05g9p.kinsta.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "eciple_admin_2024", "password": "EcipleSecure2024Admin!@#$%^&*()_+"}'
```

Should return a session token instead of "Invalid credentials"