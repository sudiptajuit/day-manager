# 📋 Deployment Checklist

Use this checklist before deploying to Vercel.

## Pre-Deployment

### Code & Repository
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] `.gitignore` excludes sensitive files
- [ ] No hardcoded secrets in code
- [ ] All environment variables use `.env.local`
- [ ] No console.log() or debugging code left
- [ ] TypeScript builds without errors: `npm run build`

### Dependencies
- [ ] All dependencies installed: `npm install`
- [ ] No deprecated packages
- [ ] package-lock.json is committed
- [ ] Node version specified in package.json (optional but recommended)

### Database
- [ ] Created database (Vercel Postgres or PlanetScale)
- [ ] Connection string obtained and tested locally
- [ ] Prisma schema is correct
- [ ] Migrations run successfully locally: `npm run prisma:migrate`
- [ ] Seed data added if needed

### Environment Variables
- [ ] `DATABASE_URL` is set and working
- [ ] `JWT_SECRET` is generated (secure, 32+ chars)
- [ ] `NEXT_PUBLIC_API_URL` points to correct domain
- [ ] No hardcoded localhost URLs in code

### Frontend Testing
- [ ] Login page works
- [ ] Signup creates new user
- [ ] Can create todos
- [ ] Can edit todos
- [ ] Can delete todos with confirmation
- [ ] Can mark todos as complete
- [ ] Filters work (All/Pending/Completed)
- [ ] Responsive design on mobile/tablet/desktop
- [ ] No console errors in development tools

### Backend Testing
- [ ] POST /api/auth/signup creates user with hashed password
- [ ] POST /api/auth/login returns JWT token
- [ ] GET /api/todos requires valid JWT
- [ ] POST /api/todos creates todo
- [ ] PUT /api/todos/:id updates todo
- [ ] DELETE /api/todos/:id removes todo
- [ ] 401 error on invalid/missing JWT token
- [ ] Users can only access their own todos

## Vercel Deployment

### Initial Setup
- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] Project created on Vercel dashboard
- [ ] Vercel CLI installed (optional): `npm install -g vercel`

### Environment Setup
- [ ] Vercel Storage database created
- [ ] DATABASE_URL environment variable added to Vercel
- [ ] JWT_SECRET environment variable added to Vercel
- [ ] NEXT_PUBLIC_API_URL environment variable added to Vercel
- [ ] Other secrets added if any

### Database Setup
- [ ] Database migrations run on Vercel:
  ```bash
  vercel env pull
  npx prisma migrate deploy
  ```
- [ ] Prisma client regenerated: `npx prisma generate`
- [ ] Database connection verified

### Deployment
- [ ] Code pushed to main branch
- [ ] Vercel deployment triggered and completed
- [ ] Deployment logs checked for errors
- [ ] Build artifacts are reasonable size

## Post-Deployment

### Functionality Testing
- [ ] Application loads on Vercel URL
- [ ] Signup works on production
- [ ] Login works with new account
- [ ] Can create/edit/delete todos
- [ ] Filters work correctly
- [ ] Responsive design still works
- [ ] No console errors

### Performance & Security
- [ ] Page load time is acceptable (< 3s)
- [ ] HTTPS is enforced
- [ ] API endpoints responding quickly
- [ ] No exposed sensitive data
- [ ] Rate limiting considered
- [ ] JWT tokens are secure

### Monitoring
- [ ] Vercel logs show no errors
- [ ] Check Vercel Analytics if available
- [ ] Monitor for any 5xx errors

## Rollback Plan (if issues)

- [ ] Previous deployment available for rollback
- [ ] Database backup exists
- [ ] Known good deployment hash saved

## Maintenance

- [ ] Monitor Vercel dashboard regularly
- [ ] Keep dependencies updated
- [ ] Review logs for errors
- [ ] Performance metrics tracked
- [ ] Security patches applied

---

## Quick Deployment Script

```bash
#!/bin/bash

echo "🚀 Deploying to Vercel..."

# 1. Run tests and build
npm run build || exit 1

# 2. Push to git
git add .
git commit -m "Deploy to Vercel"
git push origin main

# 3. Vercel auto-deploys from main branch
echo "✅ Pushed to main. Vercel deployment in progress!"
echo "📊 Check: https://vercel.com/dashboard"
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Database connection fails | Check DATABASE_URL, verify firewall, test connection string |
| JWT errors on production | Ensure JWT_SECRET is set and identical on all environments |
| 404 errors on API routes | Check routes exist, verify file structure, rebuild |
| CORS errors | Configure allowed origins in API routes if needed |
| Out of memory | Check Prisma connection pooling, optimize queries |
| Build timeout | Remove large dependencies, optimize build process |

---

✅ When all items are checked, you're ready to deploy!
