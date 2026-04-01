# 🚀 Quick Start Guide

## Local Development (5 minutes)

### 1. Setup Environment
```bash
cp .env.example .env.local

# For Mac: Install PostgreSQL
brew install postgresql
brew services start postgresql

# Create database
createdb day_manager
```

### 2. Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and update `.env.local`:
```env
DATABASE_URL="postgresql://postgres@localhost:5432/day_manager"
JWT_SECRET="<paste-here>"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Install & Setup
```bash
npm install
npm run prisma:generate
npm run prisma:migrate
```

### 4. Start Development
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Deployment to Vercel (10 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/day-manager
git push -u origin main
```

### 2. Create Vercel Project
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your repository
- Click "Deploy"

### 3. Setup Database
- In Vercel Dashboard → Storage → Create Database → Postgres
- Note the connection string

### 4. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables add:
- `DATABASE_URL` = (Your Postgres connection string)
- `JWT_SECRET` = (Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `NEXT_PUBLIC_API_URL` = `https://your-project.vercel.app`

### 5. Redeploy & Migrate
```bash
vercel env pull
npm run prisma:migrate
# Or add to package.json build script and redeploy
```

---

## Testing

### Create Account
- Email: newuser@example.com
- Password: password123

### Try Features
1. ✅ Add a new task
2. ✏️ Edit task title/description
3. 📅 Set due date
4. ✓ Mark as complete
5. 🗑️ Delete task
6. 🔍 Filter by status

---

## Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run prisma:studio   # View database
npm run prisma:migrate  # Run migrations
npm run prisma:generate # Regenerate Prisma client
npm run lint            # Run linter
```

---

## Troubleshooting

**Can't connect to database?**
```bash
# Check PostgreSQL is running
brew services start postgresql
# Or verify DATABASE_URL is correct
```

**JWT Secret missing?**
```bash
# Generate a new one
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Deployment fails?**
```bash
# Check logs
vercel logs
# Pull environment and retry
vercel env pull
```

---

**Questions?** Check the main README.md for full documentation.
