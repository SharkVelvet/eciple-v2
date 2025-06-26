# Deploy Admin Authentication Fix - Manual Steps

## Your Admin Credentials (Working Locally)
- Username: `eciple_admin_2024`
- Password: `EcipleSecure2024Admin!@#$%^&*()_+`

## Deploy via GitHub Web Interface

1. Go to: https://github.com/SharkVelvet/eciple
2. Navigate to `server/production.js`
3. Click "Edit this file" 
4. Replace entire contents with the fixed version from this Replit
5. Commit: "Deploy admin authentication fix"
6. Redeploy your Kinsta application

## Or Try Command Line
```bash
rm -f .git/index.lock .git/objects/*/tmp_obj_*
git add server/production.js
git commit -m "Deploy admin authentication fix"
git push origin main
```

## Test After Deployment
```bash
curl -X POST https://eciple-kin-05g9p.kinsta.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "eciple_admin_2024", "password": "EcipleSecure2024Admin!@#$%^&*()_+"}'
```

Should return session token instead of "Invalid credentials"

The authentication system is fixed and working locally - it just needs to be deployed to production.