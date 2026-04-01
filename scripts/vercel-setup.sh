#!/bin/bash

# Setup guide for deploying to Vercel

echo "🚀 Day Manager - Vercel Deployment Setup"
echo "=========================================="
echo ""

echo "Step 1: Install Vercel CLI"
echo "npm install -g vercel"
echo ""

echo "Step 2: Push to GitHub"
echo "$ git add ."
echo "$ git commit -m 'Ready for deployment'"
echo "$ git push origin main"
echo ""

echo "Step 3: Deploy to Vercel"
echo "$ vercel"
echo ""

echo "Step 4: Set up database"
echo "- Go to Vercel Dashboard"
echo "- Navigate to Storage → Create Database"
echo "- Choose Postgres and create a new database"
echo "- Copy the connection string"
echo ""

echo "Step 5: Add environment variables"
echo "- In Vercel Dashboard, go to Settings → Environment Variables"
echo "- Add DATABASE_URL (from Vercel Postgres)"
echo "- Add JWT_SECRET (generate with: npm run generate-jwt-secret)"
echo "- Add NEXT_PUBLIC_API_URL=https://your-domain.vercel.app"
echo ""

echo "Step 6: Run migrations"
echo "$ vercel env pull"
echo "$ npx prisma migrate deploy"
echo ""

echo "Step 7: Redeploy"
echo "$ vercel --prod"
echo ""

echo "✅ Deployment complete!"
