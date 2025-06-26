# Database Environment Guide

## Current Setup
- **Replit Development**: Uses its own PostgreSQL database instance
- **Kinsta Production**: Uses a separate PostgreSQL database instance
- **Result**: Documents uploaded in one environment won't appear in the other

## This is Expected Behavior
Each environment should have its own database to prevent development changes from affecting your live site.

## To Test Your Live Kinsta Site:
1. Upload documents through the admin dashboard on your live Kinsta site
2. Check the EcipleMatch page on your live Kinsta site (not Replit preview)
3. Documents should appear correctly on the same environment where they were uploaded

## Database Schema Compatibility
Both environments use the same database schema:
- Table: `eciple_match_documents`
- Fields: `id`, `title`, `filename`, `description`, `file_data`, `content_type`, `file_size`, `display_order`, `is_active`, `created_at`, `updated_at`

## Admin Credentials (Same for Both Environments)
- Username: `eciple_admin_2024`
- Password: `EcipleSecure2024Admin!@#$%^&*()_+`

## Current Replit Database Status
- 2 test documents currently stored
- Database connection working correctly
- Admin authentication functional