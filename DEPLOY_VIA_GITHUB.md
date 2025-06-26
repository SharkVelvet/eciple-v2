# Deploy Admin Authentication Fix via GitHub

Your production server returns `{"error":"Invalid credentials"}` while local authentication works perfectly. Deploy the fix manually through GitHub:

## Steps:
1. Go to: https://github.com/SharkVelvet/eciple/blob/main/server/production.js
2. Click "Edit this file" (pencil icon)
3. Replace entire file with the working version from this Replit
4. Commit with message: "Deploy admin authentication fix"
5. Redeploy your Kinsta application

## Credentials (confirmed working locally):
- Username: `eciple_admin_2024`
- Password: `EcipleSecure2024Admin!@#$%^&*()_+`

## Test after deployment:
```bash
curl -X POST https://eciple-kin-05g9p.kinsta.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "eciple_admin_2024", "password": "EcipleSecure2024Admin!@#$%^&*()_+"}'
```

Should return session token instead of "Invalid credentials"