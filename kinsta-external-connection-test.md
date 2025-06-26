# Kinsta Database External Connection Setup

## Issue Analysis
Your Kinsta Database connection is failing because:
1. Internal connection might not be accessible from your hosting environment
2. Public access may need to be enabled for External connection

## Solution Options

### Option 1: Enable Public Access (Recommended)
1. Go to your Kinsta Database dashboard
2. Find the "External connection" section
3. Toggle "Public access" to ON
4. Copy the External connection URL
5. Update your Kinsta environment variables with the External URL

### Option 2: Verify Internal Network Access
The internal connection should work if both database and hosting are on the same Kinsta account.

## Current Connection String Format
```
postgresql://fowl:zE8_lL4=bJ2_uD9=qD1=@eciple-db-45y1v-postgresql.eciple-db-45y1v.svc.cluster.local:5432/drunk-emerald-angelfish
```

## Next Steps
1. Enable public access on your Kinsta Database
2. Get the External connection URL from the dashboard
3. Update DATABASE_URL environment variable
4. Redeploy your application

This should resolve the "Failed to fetch documents" error.