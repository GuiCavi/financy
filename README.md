# Financy

A personal finance management app built as a monorepo. Users can register transactions (income/expenses), organize them into custom categories, and track their cash flow through a clean dashboard.

## Stack

| Layer | Tech |
|---|---|
| Monorepo | Turborepo + pnpm workspaces |
| Frontend | React 19, Vite, TailwindCSS v4, Apollo Client, React Router v7 |
| Backend | Node.js, Express 5, Apollo Server, GraphQL, TypeGraphQL |
| Database | SQLite (via Prisma + better-sqlite3) |
| Auth | JWT + bcryptjs |

## Project structure

```
financy/
├── backend/   # GraphQL API
├── frontend/  # React SPA
└── packages/  # Shared configs (eslint, typescript)
```

## Prerequisites

- Node.js >= 18
- pnpm >= 10 — install with `npm i -g pnpm`

## Getting started

### 1. Clone and install

```bash
git clone <repo-url>
cd financy
pnpm install
```

### 2. Configure environment variables

**Backend** — copy and edit `backend/.env`:

```bash
cp backend/.env.example backend/.env
```

**Frontend** — copy and edit `frontend/.env`:

```bash
cp frontend/.env.example frontend/.env
```

See the [Environment variables](#environment-variables) section below for what each value means.

### 3. Set up the database

```bash
cd backend
pnpm prisma migrate dev
pnpm prisma generate
```

This creates the local SQLite database at `backend/dev.db` and generates Prisma client types.

### 4. Run the dev servers

From the repo root:

```bash
pnpm dev
```

This starts both apps in parallel via Turborepo.

| App | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend (GraphQL) | http://localhost:4000/graphql |

## Environment variables

### `backend/.env`

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Prisma connection string for SQLite | `file:./dev.db` |
| `JWT_SECRET` | Secret key used to sign JWT tokens | `change-me-in-production` |
| `PORT` | Port the API server listens on | `4000` |

### `frontend/.env`

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend API | `http://localhost:4000` |

## Available scripts

Run from the repo root:

| Command | Description |
|---|---|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps |
| `pnpm lint` | Lint all apps |
| `pnpm format` | Format all files with Prettier |
| `pnpm check-types` | Type-check all apps |

## Future features

1. Add avatar image upload
2. Add an import feature to import csv from banks
3. Add signin from social medias
4. Add recover password
5. Add remember me when login
6. Secure even more logins with password (now its too weak)
7. Add a dialog for avoiding direct deletion
8. Fix mobile version (current done for desktop only)
9. Change dates inputs so the calendar shown matches the current design system