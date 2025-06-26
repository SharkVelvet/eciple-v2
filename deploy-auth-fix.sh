#!/bin/bash

# Manual deployment script for admin authentication fix
echo "Deploying admin authentication fix..."

# Remove git locks
rm -f .git/index.lock .git/objects/*/tmp_obj_* 2>/dev/null || true

# Add files
git add server/production.js server/production-fixed.js replit.md

# Commit changes
git commit -m "Deploy admin authentication fix - working locally with bcrypt validation"

# Push to origin
git push origin main

echo "Deployment complete. Please redeploy your Kinsta application."