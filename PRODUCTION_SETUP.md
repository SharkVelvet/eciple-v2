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

## Deployment Platform Configuration

### The Problem: Static vs Server Deployment
The admin authentication requires a Node.js server to work. If your hosting platform is deploying this as a static site, the login won't work.

### Solution: Use a Node.js Hosting Platform

**Recommended Platforms:**
1. **Vercel** (Free tier available)
   - Automatically detects Node.js
   - Set environment variables in project settings
   - Uses the `vercel.json` configuration file

2. **Netlify** (Free tier available)  
   - Supports serverless functions
   - Set environment variables in site settings
   - Uses the `netlify.toml` configuration file

3. **Railway** (Free tier available)
   - Full Node.js hosting
   - Simple git-based deployment

4. **Render** (Free tier available)
   - Node.js web services
   - Environment variables in dashboard

### How to Set Environment Variables:
1. Go to your hosting platform dashboard
2. Find "Environment Variables" or "Settings"
3. Add: `SESSION_SECRET` with a random 64-character string

Generate session secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### GitHub Pages/Static Sites:
⚠️ **Will NOT work** - GitHub Pages only serves static files, no server-side authentication possible.

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