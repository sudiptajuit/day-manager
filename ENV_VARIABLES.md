# Environment Variables Guide

This document explains all environment variables used in the Day Manager application.

## Required Variables

### DATABASE_URL
**Type:** String (Connection String)
**Required:** Yes
**Description:** Database connection string for PostgreSQL

**Local Example (PostgreSQL):**
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/day_manager"
```

**Vercel Postgres Example:**
```
DATABASE_URL="postgresql://user:password@host.supabase.co:5432/postgres?schema=public"
```

**PlanetScale Example:**
```
DATABASE_URL="mysql://user:password@aws.connect.psdb.cloud/database_name?sslaccept=strict"
```

**How to Get:**
- **Local PostgreSQL:** Use your local credentials and database name
- **Vercel Postgres:** Copy from Vercel Storage dashboard → Database settings
- **PlanetScale:** Copy from Connection string in PlanetScale dashboard

### JWT_SECRET
**Type:** String (32+ characters)
**Required:** Yes
**Description:** Secret key for signing and verifying JWT tokens

**How to Generate:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use npm script:
```bash
npm run generate-jwt-secret
```

**Example:**
```
JWT_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6"
```

⚠️ **IMPORTANT:** 
- Change for each environment (dev, staging, production)
- Don't use same secret across environments
- Keep it secure, never commit to git
- At least 32 characters recommended

### NODE_ENV
**Type:** String (specific values)
**Required:** No (default: "development")
**Options:** `development`, `production`, `test`
**Description:** Application environment

**Development:**
```
NODE_ENV="development"
```
- More verbose logging
- Hot module reloading
- No optimizations

**Production:**
```
NODE_ENV="production"
```
- Optimized builds
- Enhanced security
- Error logging only

### NEXT_PUBLIC_API_URL
**Type:** String (URL)
**Required:** Yes (for client-side requests)
**Description:** API base URL accessible from client

**Local Development:**
```
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

**Production (Vercel):**
```
NEXT_PUBLIC_API_URL="https://your-project.vercel.app"
```

**Important:** 
- Must be accessible from browser
- Prefix `NEXT_PUBLIC_` makes it visible to frontend
- Used in `src/lib/api-client.ts`

## Optional Variables

None at this time - all required variables listed above.

## Environment Files

### .env.local (Local Development)
Create from `.env.example`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your local values. **Never commit this file.**

### .env.example (Repository Template)
Committed to repository. Shows required variables without sensitive values.

### Vercel Environment Variables
Set in Vercel Dashboard:
1. Go to Project Settings
2. Click "Environment Variables"
3. Add each variable for different environments (Preview, Production)

### Production vs Preview

You can set different values for:
- **Preview:** Used for pull request deployments
- **Production:** Used for main branch deployments
- **Development:** Used locally

Example Setup:

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| DATABASE_URL | local postgres | vercel-staging-db | vercel-prod-db |
| JWT_SECRET | dev-secret-xxx | preview-secret-yyy | prod-secret-zzz |
| NEXT_PUBLIC_API_URL | http://localhost:3000 | https://preview.vercel.app | https://prod.vercel.app |
| NODE_ENV | development | production | production |

## Usage in Code

### Backend (API Routes)
```typescript
// src/lib/jwt.ts
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// src/lib/prisma.ts
// Automatically reads DATABASE_URL
```

### Frontend (Client-side)
```typescript
// src/lib/api-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Components can also access NEXT_PUBLIC_* variables
console.log(process.env.NEXT_PUBLIC_API_URL);
```

### Build Time
Variables (especially `NEXT_PUBLIC_*`) are injected at build time. To change them, you must rebuild.

## Security Best Practices

1. **Never commit secrets:**
   ```bash
   # .gitignore
   .env.local
   .env
   ```

2. **Use strong JWT_SECRET:**
   - Minimum 32 characters
   - Use `crypto.randomBytes()` or random string generator
   - Different for each environment

3. **Rotate secrets regularly:**
   - In staging/production
   - After team member leaves

4. **Access control:**
   - Only authorized team members access environment variables
   - Use Vercel team roles and permissions

5. **Audit logs:**
   - Monitor who accessed database
   - Review API logs regularly

6. **HTTPS only:**
   - Always use HTTPS in production
   - Vercel enforces this automatically

## Troubleshooting

### "DATABASE_URL is not defined"
```bash
# Solution: Ensure .env.local exists
cp .env.example .env.local
# Edit with your database URL
nano .env.local
```

### "JWT token errors"
```bash
# Solution: Verify JWT_SECRET is set
echo $JWT_SECRET  # Should return your secret, not blank

# For Vercel: Check environment variable is added
vercel env pull
```

### "Cannot connect to database"
```bash
# Solution: Test connection string
psql <DATABASE_URL>

# Or regenerate and verify
DATABASE_URL="postgresql://user:pass@localhost:5432/db_name" npm run dev
```

### "API requests fail with 401"
```bash
# Solution: Check NEXT_PUBLIC_API_URL matches your domain
# In browser console:
console.log(process.env.NEXT_PUBLIC_API_URL)

# Should match your actual deployment URL
```

## Quick Reference

### Copy Sample .env.local
```bash
cp .env.example .env.local
```

### Generate JWT Secret
```bash
npm run generate-jwt-secret
```

### View Vercel Environment Variables
```bash
vercel env ls
```

### Pull Vercel Environment Variables
```bash
vercel env pull
```

### Validate Environment
```bash
# Check all required variables are present
node -e "
const required = ['DATABASE_URL', 'JWT_SECRET'];
required.forEach(key => {
  if (!process.env[key]) {
    console.error('❌ Missing:', key);
  } else {
    console.log('✅ Found:', key);
  }
});
"
```

---

## Summary

| Variable | Local | Vercel | Required | Sensitive |
|----------|:-----:|:------:|:--------:|:---------:|
| DATABASE_URL | ✅ | ✅ | ✅ | ✅ Yes |
| JWT_SECRET | ✅ | ✅ | ✅ | ✅ Yes |
| NODE_ENV | ✅ | ✅ | ❌ | ❌ No |
| NEXT_PUBLIC_API_URL | ✅ | ✅ | ✅ | ❌ No |

---

For more help, check README.md or QUICKSTART.md
