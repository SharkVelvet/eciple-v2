# Production Deployment Setup for Eciple Admin Dashboard

## Required Environment Variables

For the admin authentication system to work on your live domain, you need to set these environment variables:

### Essential Environment Variables:
```bash
# Session Security (REQUIRED)
SESSION_SECRET=your-64-character-random-string-here

# Database (if using persistent database)
DATABASE_URL=your-database-connection-string

# Node Environment
NODE_ENV=production
```

## How to Set Environment Variables on Your Hosting Platform

### For most hosting platforms (Vercel, Netlify, etc.):
1. Go to your project dashboard
2. Navigate to Environment Variables or Settings
3. Add the following variables:

**SESSION_SECRET**: Generate a secure 64-character random string:
```bash
# Use this command to generate a secure session secret:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### For GitHub Pages or Static Hosting:
If you're using static hosting that doesn't support server-side environment variables, the admin authentication won't work because it requires a Node.js server. You'll need to use a platform that supports Node.js like:
- Vercel
- Netlify
- Railway
- Render
- Replit Deployments

## Updated Admin Credentials (Testing)

The admin system now uses these simple test credentials:
- **Username**: `admin`
- **Password**: `test123`

*Note: These are simplified credentials for testing. Change to secure credentials for production use.*

## Security Features Added:
- Automatic session secret generation for production
- Secure cookies for HTTPS environments
- bcrypt password hashing with 12 salt rounds
- Session token-based authentication
- Automatic session cleanup

## Testing Production Deployment:
1. Deploy your code with environment variables set
2. Visit `your-domain.com/admin-login`
3. Use the admin credentials above
4. Verify you can access the dashboard at `your-domain.com/admin-dashboard`

## Troubleshooting:
- If login fails, check that `SESSION_SECRET` is set in your environment
- If cookies aren't persisting, ensure your domain supports HTTPS (required for secure cookies)
- Check your hosting platform's logs for any server errors