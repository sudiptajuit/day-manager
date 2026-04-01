#!/bin/bash

# Generate JWT Secret
echo "🔐 Generating new JWT Secret..."
SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo ""
echo "Add this to your .env.local file:"
echo "JWT_SECRET=\"$SECRET\""
echo ""
echo "✅ Make sure to also add this to your Vercel environment variables!"
