# Kinsta Environment Variables Setup

## Required Environment Variables for Production

Update these environment variables in your Kinsta hosting dashboard:

### Database Configuration
```
DATABASE_URL=postgres://fowl:zE8_lL4=bJ2_uD9=qD1=@eciple-db-45y1v-postgresql.eciple-db-45y1v.svc.cluster.local:5432/drunk-emerald-angelfish
```

### Session Configuration (if not already set)
```
SESSION_SECRET=your-secure-session-secret-here
NODE_ENV=production
```

## Steps to Update in Kinsta:

1. Go to your Kinsta hosting dashboard
2. Navigate to your eciple site
3. Go to Environment Variables section
4. Update DATABASE_URL with the new Kinsta database connection string
5. Save and restart your application

## Verification:

Once updated, your live site will:
- Connect to the Kinsta PostgreSQL database
- Show admin dashboard changes immediately
- Display documents in EcipleMatch modal in real-time
- Have consistent data between admin dashboard and public pages

## Database Contents:

Your Kinsta database now contains:
- Admin user: eciple_admin_2024 (with secure password)
- Document: "Testing 222" (marked as active)
- Document: "Welcome to EcipleMatch" (marked as active)
- All necessary tables and indexes

## Testing:

After updating the environment variables:
1. Test admin login at: https://eciple-kin-05g9p.kinsta.app/admin-login
2. Check EcipleMatch page: https://eciple-kin-05g9p.kinsta.app/eciplematch
3. Verify documents appear in the modal when clicking "Browse Documents"