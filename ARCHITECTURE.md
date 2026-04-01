# Architecture & System Design

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BROWSER / CLIENT                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Next.js Frontend (SPA)                 │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Pages: Login, Signup, Dashboard             │  │   │
│  │  │  Components: Navbar, TodoForm, TodoList      │  │   │
│  │  │  Styling: Tailwind CSS                       │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                    │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  State Management (Zustand)                  │  │   │
│  │  │  - useAuthStore (user, token)               │  │   │
│  │  │  - useTodoStore (todos, filter, status)     │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                    │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  HTTP Client (Axios)                         │  │   │
│  │  │  - Base URL configuration                    │  │   │
│  │  │  - Request interceptors (JWT)                │  │   │
│  │  │  - Response interceptors (error handling)    │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓ ↑                                 │
│                    HTTP Requests                           │
│                    (with JWT)                              │
└─────────────────────────────────────────────────────────────┘
                         ↓ ↑
              ┌──────────────────────┐
              │   INTERNET / HTTPS   │
              └──────────────────────┘
                         ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL (Hosting)                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Next.js Server (Serverless Functions)       │   │
│  │                                                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  API Routes (Next.js App Router)             │  │   │
│  │  │                                              │  │   │
│  │  │  • /api/auth/signup                          │  │   │
│  │  │  • /api/auth/login                           │  │   │
│  │  │  • /api/todos (GET, POST)                    │  │   │
│  │  │  • /api/todos/[id] (PUT, DELETE)             │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  Middleware & Utilities                      │  │   │
│  │  │  - JWT verification                          │  │   │
│  │  │  - bcrypt password hashing                   │  │   │
│  │  │  - Error handling                            │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  │                                                     │   │
│  │  ┌──────────────────────────────────────────────┐  │   │
│  │  │  ORM Layer (Prisma)                          │  │   │
│  │  │  - Query building                            │  │   │
│  │  │  - Type safety                               │  │   │
│  │  │  - Schema management                         │  │   │
│  │  └──────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                         ↓ ↑                                 │
│                    Database Connection                     │
│                    (Connection Pooling)                    │
└─────────────────────────────────────────────────────────────┘
                         ↓ ↑
              ┌──────────────────────┐
              │   DATABASE LAYER      │
              ├──────────────────────┤
              │  PostgreSQL Database  │
              │  (Vercel Postgres or  │
              │   PlanetScale MySQL)  │
              └──────────────────────┘
```

---

## 🔄 Request/Response Flow

### Authentication Flow

```
USER LOGIN REQUEST
    ↓
[POST /api/auth/login]
    ↓
Validate Input
    ↓
Find User in DB
    ↓
Compare Passwords (bcrypt)
    ↓
Generate JWT Token
    ↓
Store Token in localStorage
    ↓
Update Auth Store
    ↓
Redirect to Dashboard
    ↓
[SUCCESS]
```

### Todo Creation Flow

```
USER ACTION (Add Todo)
    ↓
[POST /api/todos]
    ↓
Extract JWT from Header
    ↓
Verify JWT Token
    ↓
Validate Input Data
    ↓
Get userId from JWT
    ↓
Create Todo in DB
    ↓
Update Local Store
    ↓
Re-render UI
    ↓
[TODO APPEARS ON PAGE]
```

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  USER INTERACTION                       │
│           (Click Button, Type Input, etc)               │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│              REACT COMPONENT STATE                      │
│         (Forms, Buttons, Input Fields)                  │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│         ZUSTAND STATE MANAGEMENT                        │
│      (useAuthStore, useTodoStore)                       │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│           API CLIENT (Axios)                            │
│    (HTTP Requests with JWT Bearer Token)                │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│         NEXT.JS API ROUTES                              │
│    (Handle HTTP Requests & Business Logic)              │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│           PRISMA ORM                                    │
│      (Generate & Execute Queries)                       │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│         POSTGRESQL DATABASE                             │
│      (Store & Retrieve Data)                            │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│      DATA RETURNS BACK UP THE STACK                     │
│  (Database → Prisma → API → Axios → Store → Component) │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│         COMPONENT RE-RENDERS                            │
│        (with Updated Data/UI)                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Component Hierarchy

```
App (Root Layout)
│
├── Navbar
│   ├── Logo
│   ├── User Email Display
│   └── Logout Button
│
└── Pages
    ├── LoginPage
    │   ├── Email Input
    │   ├── Password Input
    │   ├── Submit Button
    │   └── Signup Link
    │
    ├── SignupPage
    │   ├── Name Input (optional)
    │   ├── Email Input
    │   ├── Password Input
    │   ├── Confirm Password Input
    │   ├── Submit Button
    │   └── Login Link
    │
    └── DashboardPage
        ├── Header (Task Count)
        ├── TodoForm
        │   ├── Title Input
        │   ├── Description Input (expanded)
        │   ├── Due Date Input (expanded)
        │   ├── Add Button
        │   └── Cancel Button
        │
        ├── FilterButtons
        │   ├── All Tasks Button
        │   ├── Pending Button
        │   └── Completed Button
        │
        └── TodoList
            └── TodoItem[] (repeating)
                ├── Checkbox (completed)
                ├── Title
                ├── Description
                ├── Due Date
                ├── Edit Button
                └── Delete Button
```

---

## 🗄️ Database Schema Relationships

```
┌─────────────────────────────┐
│          USER               │
├─────────────────────────────┤
│ id (PK)                     │
│ email (UNIQUE)              │
│ password (hashed)           │
│ name                        │
│ createdAt                   │
│ updatedAt                   │
└──────────────┬──────────────┘
               │
               │ 1:N Relationship
               │ (One User, Many Todos)
               │
┌──────────────▼──────────────┐
│          TODO               │
├─────────────────────────────┤
│ id (PK)                     │
│ userId (FK → User.id)       │
│ title                       │
│ description                 │
│ completed                   │
│ dueDate                     │
│ createdAt                   │
│ updatedAt                   │
└─────────────────────────────┘
```

**Relationships:**
- 1 User → Many Todos
- ON DELETE CASCADE (if user deleted, todos deleted)
- Indexed on userId for fast queries

---

## 🔐 Authentication & Security Flow

```
┌────────────────────────────────────────────────────────────┐
│                    LOGIN PROCESS                           │
│                                                            │
│  1. User enters credentials                               │
│  2. Validate format (email, password length)              │
│  3. Find user in database                                 │
│  4. Compare password with hash using bcrypt              │
│  5. Generate JWT token (valid for 7 days)                │
│  6. Return token to client                                │
│  7. Store token in localStorage                           │
│  8. Add to axios headers: "Authorization: Bearer <JWT>"   │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│              PROTECTED API REQUEST PROCESS                 │
│                                                            │
│  1. Client sends request with JWT in header              │
│  2. API receives request                                  │
│  3. Extract JWT from Authorization header                │
│  4. Verify JWT signature using JWT_SECRET                │
│  5. Check token expiration                                │
│  6. Extract userId from JWT payload                       │
│  7. Verify user still exists in DB                        │
│  8. Process request for that user only                    │
│  9. Return response                                        │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│              PASSWORD HASHING (bcrypt)                     │
│                                                            │
│  Input Password: "myPassword123"                          │
│         ↓                                                  │
│  bcrypt.hash() with 10 salt rounds                        │
│         ↓                                                  │
│  Stored: "$2a$10$...hashed_password..."                   │
│         ↓                                                  │
│  On Login: bcrypt.compare(input, stored) → true/false    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🌍 API Endpoints Map

```
Root Domain: https://your-app.vercel.app (or localhost:3000)

┌─ Authentication Routes
│  ├─ POST   /api/auth/signup           → Create user account
│  └─ POST   /api/auth/login            → Login and get JWT token
│
├─ Todo Routes (All require JWT token)
│  ├─ GET    /api/todos                 → List all user's todos
│  ├─ POST   /api/todos                 → Create new todo
│  ├─ PUT    /api/todos/:id             → Update todo by ID
│  └─ DELETE /api/todos/:id             → Delete todo by ID
│
└─ Frontend Routes
   ├─ GET    /                           → Home (redirects to /dashboard or /login)
   ├─ GET    /login                      → Login page
   ├─ GET    /signup                     → Signup page
   └─ GET    /dashboard                  → Main app (requires authentication)
```

---

## 📦 State Management (Zustand Stores)

### useAuthStore
```javascript
{
  user: User | null          // Current logged-in user
  token: string | null       // JWT token
  isLoading: boolean         // Loading state
  isAuthenticated: boolean   // Authentication status
  
  // Methods
  setUser(user)              // Update user
  setToken(token)            // Update token
  logout()                   // Clear auth data
  initializeAuth()           // Restore auth from localStorage
}
```

### useTodoStore
```javascript
{
  todos: Todo[]              // List of todos
  filter: TodoFilter         // Current filter state
  isLoading: boolean         // Loading state
  
  // Methods
  setTodos(todos)            // Replace all todos
  addTodo(todo)              // Add new todo
  updateTodo(todo)           // Update existing todo
  removeTodo(id)             // Delete todo
  setFilter(filter)          // Update filter
  getFilteredTodos()         // Get filtered list
}
```

---

## 🚀 Deployment Architecture

```
Github Repository
    ↓
    ↓ (Push to main branch)
    ↓
Vercel Webhook
    ↓
Vercel Build Process
├─ Install dependencies
├─ Generate Prisma client
├─ Run TypeScript compiler
├─ Build Next.js app
└─ Deploy to CDN + Serverless
    ↓
Edge Locations (CDN)
├─ Static assets cached
└─ Optimal performance
    ↓
Serverless Functions
├─ API routes on demand
├─ Cold start < 100ms
└─ Auto-scaling
    ↓
PostgreSQL Database
└─ Connection pooling
    ↓
Live Application
├─ https://your-app.vercel.app
└─ Production Ready!
```

---

## 🔧 Technology Stack Relationships

```
┌─── Frontend ─────────────────┐
│  React 18                    │    Renders UI
│  └─ Next.js 14               │    Framework
│     └─ TypeScript            │    Type Safety
│        └─ Tailwind CSS       │    Styling
│           └─ React Icons     │    Icons
│                              │
├─── State & HTTP ────────────┤
│  Zustand                     │    State Storage
│  Axios                       │    HTTP Requests
│  date-fns                    │    Date Formatting
│                              │
├─── Backend ──────────────────┤
│  Next.js API Routes          │    Serverless Functions
│  JWT / bcryptjs              │    Authentication
│                              │
├─── Database ─────────────────┤
│  Prisma                      │    ORM
│  └─ PostgreSQL               │    Database Engine
│                              │
└─── Deployment ──────────────┘
   Vercel                      │    Hosting Platform
```

---

## 📈 Performance Considerations

```
Frontend Performance
├─ Code Splitting (Next.js automatic)
├─ Image Optimization
├─ Lazy Component Loading
└─ Zustand Store (light state management)

Backend Performance
├─ Serverless cold starts < 100ms
├─ Connection pooling (Prisma)
├─ Database query optimization
└─ Response caching (client-side)

Database Performance
├─ Indexes on userId in todos table
├─ Connection limits managed
├─ Query optimization via Prisma
└─ Automatic scaling
```

---

## 🔒 Security Layers

```
Layer 1: Transport Security
├─ HTTPS enforced (Vercel)
└─ TLS 1.3+

Layer 2: Authentication
├─ JWT tokens (secure)
├─ Token expiration (7 days)
├─ Secure storage (localStorage)
└─ Bearer token in Authorization header

Layer 3: Data Protection
├─ Password hashing (bcryptjs)
├─ Salt rounds (10)
├─ No plaintext passwords in DB
└─ Comparison timing-attack safe

Layer 4: Access Control
├─ Authenticated routes only
├─ User ID verification
├─ Todo ownership verification
└─ SQL injection prevention (Prisma)

Layer 5: Error Handling
├─ Generic error messages
├─ No sensitive data in logs
├─ Rate limiting ready
└─ Validation on all inputs
```

---

This comprehensive system design ensures a robust, scalable, and secure Todo application.
