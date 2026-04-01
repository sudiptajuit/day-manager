# 🎯 Day Manager - Full Stack Todo Web App

A modern, production-ready Todo Web Application built with React, Next.js, TypeScript, and Vercel. Featuring JWT authentication, Prisma ORM, and a clean, responsive UI.

## ✨ Features

- **Authentication**: Secure login/signup with JWT tokens and bcrypt password hashing
- **Todo Management**: Create, read, update, and delete tasks
- **Task Filtering**: View all tasks, completed, or pending
- **Due Dates**: Set and track task due dates
- **Task Details**: Add descriptions to tasks
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time UI**: Instant feedback on all operations
- **Persistent Storage**: All data stored securely in PostgreSQL

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Next.js 14** (App Router)
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Axios** for HTTP requests
- **React Icons** for beautiful UI icons
- **Date-fns** for date handling

### Backend
- **Next.js API Routes** (Vercel Serverless Functions)
- **Prisma ORM** for database management
- **JWT** for authentication
- **bcryptjs** for password hashing

### Database
- **PostgreSQL** (via Vercel Postgres or PlanetScale)

## 📁 Project Structure

```
day-manager/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts
│   │   │   │   └── signup/
│   │   │   │       └── route.ts
│   │   │   └── todos/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── TodoForm.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoList.tsx
│   │   └── FilterButtons.tsx
│   ├── lib/
│   │   ├── api-client.ts
│   │   ├── api-utils.ts
│   │   ├── auth.ts
│   │   ├── auth-store.ts
│   │   ├── jwt.ts
│   │   ├── prisma.ts
│   │   └── todo-store.ts
│   └── types/
│       └── index.ts
├── prisma/
│   └── schema.prisma
├── .env.example
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm
- PostgreSQL database (local or cloud)

### 1. Clone and Setup

```bash
# Clone or navigate to the project
cd day-manager

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and update with your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# For local PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/day_manager"

# Generate a strong secret key (use: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_SECRET="your-super-secret-jwt-key-minimum-32-characters"

NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### 3. Database Setup

**Option A: Local PostgreSQL**

```bash
# Create database
createdb day_manager

# Initialize Prisma
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

**Option B: Quick Test with SQLite** (Development Only)

Change `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Test the Application

**Demo Account:**
- Email: `demo@example.com`
- Password: `password123`

Or create a new account via the signup page.

## 📊 Database Schema

### Users Table
- `id` (Int, Primary Key)
- `email` (String, Unique)
- `password` (String, hashed)
- `name` (String, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Todos Table
- `id` (Int, Primary Key)
- `userId` (Int, Foreign Key → Users.id)
- `title` (String)
- `description` (String, Optional)
- `completed` (Boolean, default: false)
- `dueDate` (DateTime, Optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## 🔐 API Endpoints

### Authentication

**POST /api/auth/signup**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "jwt-token",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Todos (All require Authorization header: `Bearer <token>`)

**GET /api/todos**
Returns all todos for authenticated user.

**POST /api/todos**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "dueDate": "2024-04-15"
}
```

**PUT /api/todos/:id**
```json
{
  "title": "Updated title",
  "completed": true,
  "dueDate": "2024-04-20"
}
```

**DELETE /api/todos/:id**
Deletes the todo with specified id.

## 📦 Deployment on Vercel

### 1. Prepare Repository

```bash
# Initialize git if not already done
git init

# Create .gitignore (already included)
# Add all files
git add .
git commit -m "Initial commit"

# Push to GitHub, GitLab, or Bitbucket
git branch -M main
git remote add origin https://github.com/yourusername/day-manager.git
git push -u origin main
```

### 2. Create Vercel Project

**Option A: Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Follow the setup wizard

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

### 3. Setup Database on Vercel

**Option A: Vercel Postgres** (Recommended)

1. In Vercel Dashboard, go to your project
2. Click "Storage" tab
3. Click "Create Database" → Select "Postgres"
4. Create a new database
5. Click the database and copy the connection string
6. Vercel will automatically add `POSTGRES_URL_NON_POOLING` to environment variables

**Option B: PlanetScale**

1. Go to [planetscale.com](https://planetscale.com)
2. Create a new MySQL database
3. Get the connection string
4. In Vercel Dashboard → Settings → Environment Variables
5. Add `DATABASE_URL=<your-planetscale-url>`

**Option C: MongoDB Atlas**

Unfortunately, Prisma with SQL is required for this schema. For MongoDB, the schema would need modification.

### 4. Setup Environment Variables

**In Vercel Dashboard:**

1. Go to Settings → Environment Variables
2. Add these variables:

```
DATABASE_URL=postgresql://... (or from Vercel Postgres/PlanetScale)
JWT_SECRET=your-very-secure-random-string-32-chars-minimum
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-vercel-domain.vercel.app
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Deploy

```bash
# Push to main branch
git push origin main
```

Vercel will automatically deploy on every push to main.

Or manually trigger from Vercel Dashboard:
1. Click "Deploy" button

### 6. Run Database Migrations on Vercel

After first deployment, run migrations:

```bash
# If using Vercel CLI
vercel env pull
npx prisma migrate deploy

# Or directly in Vercel
# Click "Functions" → Open a function editor
# Run: npx prisma migrate deploy
```

Alternatively, add this to `package.json` postbuild script:

```json
"scripts": {
  "build": "next build && npx prisma migrate deploy"
}
```

Then redeploy.

## 🔧 Advanced Configuration

### Prisma Studio (Local Development)

View and edit database:

```bash
npm run prisma:studio
```

Visit `http://localhost:5555`

### Generate Prisma Client

```bash
npm run prisma:generate
```

### Create New Migration

```bash
npm run prisma:migrate -- --name your_migration_name
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
lsof -i :3000
kill -9 <PID>
```

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check firewall rules
- For PostgreSQL: ensure server is running (`brew services start postgresql` on Mac)

### JWT Token Error
- Check `JWT_SECRET` is set and same on all instances
- Clear localStorage and re-login

### Prisma Errors
```bash
# Regenerate client
npm run prisma:generate

# Pull fresh schema
vercel env pull
```

### Next.js Build Errors
```bash
# Clear build cache
rm -rf .next

# Rebuild
npm run build
```

## 🔒 Security Best Practices

1. **JWT Secret**: Use a strong, random 32+ character string
2. **HTTPS**: Always use HTTPS in production (Vercel handles this)
3. **CORS**: Configure in `next.config.js` if needed
4. **Rate Limiting**: Consider adding rate limiting for auth endpoints
5. **SQL Injection**: Prisma ORM prevents this
6. **XSS Protection**: Next.js provides built-in protection
7. **CSRF Protection**: Use SameSite cookies (default in Next.js)

## 📱 Responsive Design

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components use Tailwind CSS for responsive design.

## 🚀 Performance Optimization

- Image optimization via Next.js
- Code splitting and lazy loading
- API response caching (client-side with Zustand)
- Database connection pooling (Prisma)

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [JWT Authentication](https://jwt.io/introduction)
- [Vercel Deployment](https://vercel.com/docs)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Feel free to fork, modify, and improve!

## 💬 Support

For issues or questions:
1. Check the troubleshooting section
2. Review server logs: `vercel logs`
3. Check client console for errors

---

**Happy task managing! 🎯**
