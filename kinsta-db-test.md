# Kinsta Database Connection Update

## Corrected DATABASE_URL for Kinsta Environment Variables:

```
postgresql://fowl:zE8_lL4=bJ2_uD9=qD1=@eciple-db-45y1v-postgresql.eciple-db-45y1v.svc.cluster.local:5432/drunk-emerald-angelfish
```

## Steps to Update:

1. Go to Kinsta hosting dashboard
2. Navigate to your eciple site Environment Variables
3. Update DATABASE_URL to the corrected string above (note: "postgresql://" not "postgres://")
4. Save and restart your application

## After Update:

Your admin login will work with:
- Username: eciple_admin_2024
- Password: EcipleSecure2024Admin!@#$%^&*()_+

The timeout issues should resolve once the corrected connection string is deployed.