# VoltFix Electrical — Full-Stack Demo

React + Vite frontend · Node.js/Express backend (MVC) · PostgreSQL via Prisma

---

## Project structure

```
├── frontend/
│   └── src/
│       ├── App.jsx               ← React Router root
│       ├── PublicSite.jsx        ← Public page + SiteDataContext
│       ├── lib/api.js            ← All API calls (one place)
│       ├── context/AuthContext   ← JWT auth for admin
│       ├── data/constants.js     ← Fallback data (shown while API loads)
│       ├── components/           ← Public page components (read from context)
│       └── admin/
│           ├── LoginPage.jsx
│           ├── AdminLayout.jsx   ← Protected sidebar layout
│           ├── DashboardPage.jsx ← Enquiries list + status
│           ├── BusinessPage.jsx  ← Edit name, phone, email…
│           ├── ServicesPage.jsx  ← CRUD services
│           ├── ReviewsPage.jsx   ← CRUD reviews
│           └── AreasPage.jsx     ← CRUD service areas
│
└── backend/
    ├── prisma/
    │   ├── schema.prisma         ← DB schema
    │   └── seed.js               ← Seeds all hardcoded data into Postgres
    ├── prisma.config.ts          ← Prisma 7 connection config
    └── src/
        ├── app.js
        ├── lib/prisma.js         ← Prisma client singleton
        ├── routes/               ← auth, business, services, reviews, areas, enquiries
        ├── controllers/          ← logic per resource
        ├── models/               ← DB calls (swap these if changing DB)
        └── middleware/           ← JWT auth, error handler
```

---

## One-time setup

### 1. PostgreSQL

Install PostgreSQL locally or use any cloud provider (Railway, Supabase, Neon — all free tiers).

Create a database:
```sql
CREATE DATABASE voltfix;
```

### 2. Backend env

```bash
cd backend
copy .env.example .env
```

Edit `.env` and set your connection string:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/voltfix"
JWT_SECRET="any-long-random-string"
```

### 3. Run migrations + seed

```bash
cd backend
npx prisma migrate dev --name init
npm run seed          # or: node prisma/seed.js
```

This creates all tables and seeds:
- Admin user: `admin` / `admin123` (change after first login)
- All services, reviews, areas from the original hardcoded data
- Business info

### 4. Start servers

```bash
# Terminal 1
cd backend && npm run dev      # http://localhost:3000

# Terminal 2
cd frontend && npm run dev     # http://localhost:5173
```

---

## Admin panel

Go to `http://localhost:5173/admin/login`

Default credentials:
- Username: `admin`
- Password: `admin123`

**What you can manage:**
- Enquiries — view form submissions, mark as contacted/resolved
- Business Info — name, phone, WhatsApp, email, address, hours
- Services — add/edit/delete service cards
- Reviews — add/edit/delete testimonials
- Areas — add/remove service coverage areas

All changes reflect on the public site immediately.

---

## API endpoints

| Method | Endpoint                    | Auth     | Description             |
|--------|-----------------------------|----------|-------------------------|
| POST   | /api/auth/login             | —        | Get JWT token           |
| PUT    | /api/auth/password          | ✓ JWT    | Change password         |
| GET    | /api/business               | —        | Get business info       |
| PUT    | /api/business               | ✓ JWT    | Update business info    |
| GET    | /api/services               | —        | List services           |
| POST   | /api/services               | ✓ JWT    | Add service             |
| PUT    | /api/services/:id           | ✓ JWT    | Update service          |
| DELETE | /api/services/:id           | ✓ JWT    | Delete service          |
| GET    | /api/reviews                | —        | List reviews            |
| POST   | /api/reviews                | ✓ JWT    | Add review              |
| PUT    | /api/reviews/:id            | ✓ JWT    | Update review           |
| DELETE | /api/reviews/:id            | ✓ JWT    | Delete review           |
| GET    | /api/areas                  | —        | List areas              |
| POST   | /api/areas                  | ✓ JWT    | Add area                |
| DELETE | /api/areas/:id              | ✓ JWT    | Delete area             |
| POST   | /api/enquiries              | —        | Submit contact form     |
| GET    | /api/enquiries              | ✓ JWT    | List all enquiries      |
| PATCH  | /api/enquiries/:id/status   | ✓ JWT    | Update enquiry status   |
