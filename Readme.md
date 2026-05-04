# BigBode — AI Tarot Reading Platform

> An immersive, AI-powered tarot reading experience with a full 78-card deck, intelligent interpretations, and a personal reading journal.

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Frontend Pages](#frontend-pages)
- [Security](#security)
- [Roadmap](#roadmap)
- [Deployment Checklist](#deployment-checklist)

---

## About

BigBode is a modern full-stack web application that brings tarot card readings into the digital age. Users draw cards through an authentic shuffle-cut-pick ritual, and **BigBen** — the AI tarot master powered by Google Gemini 2.5 Flash — delivers rich, personalized interpretations.

Whether you're seeking clarity on love, career, health, or life in general, BigBode gives you a complete tarot experience: from browsing the full 78-card library with detailed meanings, to saving your most meaningful readings in a personal journal.

---

## Features

### 🔮 Tarot Experience
- Authentic reading ritual — shuffle, cut, then pick your cards
- Multiple spread types organized by life category: **General · Love · Career · Health**
- Every card can appear **upright or reversed**, each with distinct meanings
- **Daily card draw** — one special reading per day per user
- **Guest mode** — do a reading without creating an account

### 🤖 AI & Interpretations
- **BigBen AI** — a unique tarot master persona powered by Google Gemini 2.5 Flash
- Full reading interpretation with **detailed summary** and **per-card analysis**
- **Mood score** on every reading — a numeric sentiment reflecting your spread's energy
- AI responses in Thai language, tailored to the BigBen character
- **Share image generation** — creates a beautiful card using canvas with Thai font support (Sarabun), ready to share

### 👤 User Account
- Secure registration with email or mobile phone + username
- JWT-authenticated sessions (1-day token, HS256)
- Edit your profile: name, zodiac sign, date of birth, profile image
- **Reading history** — every session is stored and accessible
- **Saved readings journal** — bookmark readings and add personal notes

### 📚 Card Library
- Full 78-card tarot deck (22 Major Arcana + 56 Minor Arcana)
- Each card shows: image, upright meaning, reversed meaning, detailed description, and suit
- Searchable and browsable library

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Backend Framework** | Express 5 |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7 |
| **AI** | Google Gemini 2.5 Flash (`@google/genai`) |
| **Auth** | JWT (`jsonwebtoken`) + bcrypt |
| **Validation** | Zod (backend + frontend) |
| **Security** | Helmet, CORS |
| **Image Generation** | `@napi-rs/canvas` |
| **Frontend Framework** | React 19 |
| **Routing** | React Router 7 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 + DaisyUI |
| **State Management** | Zustand |
| **HTTP Client** | Axios |
| **Forms** | React Hook Form + Zod |
| **Animations** | Framer Motion |
| **Notifications** | React Toastify |

---

## Project Structure

```
bigbode/
├── bb_backend/                     # Express API server
│   ├── src/
│   │   ├── server.js               # Entry point
│   │   ├── app.js                  # Express setup (CORS, Helmet, routes)
│   │   ├── controllers/            # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── reading.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── library.controller.js
│   │   ├── routes/                 # API route definitions
│   │   ├── services/               # Business logic
│   │   ├── middlewares/            # Auth, error, dailyCheck, 404
│   │   ├── validations/            # Zod schemas
│   │   ├── utils/
│   │   │   ├── ai.js               # Gemini API integration
│   │   │   ├── imageGenerator.js   # Canvas share image
│   │   │   └── jwt.js              # Token helpers
│   │   ├── lib/prisma.js           # Prisma client
│   │   └── assets/fonts/           # Thai fonts (Sarabun) for image gen
│   └── prisma/
│       ├── schema.prisma           # 13 database models
│       ├── seed.js                 # Tarot card seeder (78 cards)
│       └── migrations/
│
└── bb_frontend/                    # React + Vite app
    ├── src/
    │   ├── api/mainapi.js          # Axios instance + all API calls
    │   ├── pages/                  # Page components
    │   ├── components/             # Reusable UI components
    │   ├── routes/AppRoutes.jsx    # Route configuration
    │   ├── stores/                 # Zustand state stores
    │   ├── validations/            # Zod schemas (frontend)
    │   └── layouts/UserLayout.jsx  # Shared page wrapper
    └── public/                     # Static assets
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL 14+
- Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bigbode.git
cd bigbode
```

### 2. Install backend dependencies
```bash
cd bb_backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../bb_frontend
npm install
```

### 4. Configure environment variables

Create `bb_backend/.env` — see [Environment Variables](#environment-variables) for all required values.

Create `bb_frontend/.env.local` for local dev:
```
VITE_API_URL=http://localhost:3000/api
```

### 5. Set up the database
```bash
cd ../bb_backend
npx prisma migrate dev
npx prisma db seed
```

### 6. Run the backend
```bash
npm run dev
# Server starts on http://localhost:3000
```

### 7. Run the frontend
```bash
cd ../bb_frontend
npm run dev
# App opens on http://localhost:5173
```

---

## Environment Variables

### Backend (`bb_backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Port for the Express server (default: 3000) |
| `DATABASE_URL` | **Yes** | PostgreSQL connection string |
| `JWT_SECRET` | **Yes** | Secret key for signing JWT tokens (use a long random string) |
| `GEMINI_API_KEY` | **Yes** | Google Gemini API key for AI interpretations |
| `FRONTEND_URL` | No | Production frontend URL for CORS (default: http://localhost:5173) |
| `NODE_ENV` | No | Set to `production` to suppress error logs |

### Frontend (`bb_frontend/.env.local` or `.env.production`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No | Backend API base URL (default: http://localhost:3000/api) |

---

## API Reference

All endpoints are prefixed with `/api`. JWT token must be sent as `Authorization: Bearer <token>`.

### Authentication
| Method | Path | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/auth/register` | None | `identity, username, password, confirmPassword, firstName?, lastName?, zodiac?, dateOfBirth?` | Register new user |
| `POST` | `/auth/login` | None | `username, password` | Login — returns `token`, `user`, `profile` |

### User
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/users/me` | Required | Get own profile |
| `PATCH` | `/users/me` | Required | Update profile (name, zodiac, dateOfBirth, profileImage) |
| `GET` | `/users/history` | Required | All past readings |
| `POST` | `/users/saved-readings` | Required | Save a reading to journal |
| `GET` | `/users/saved-readings` | Required | List all saved readings |
| `GET` | `/users/saved-readings/:readingId` | Required | Get one saved reading with detail |
| `DELETE` | `/users/saved-readings/:readingId` | Required | Delete a saved reading |

### Card Library
| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/cards` | Required | List all 78 cards |
| `GET` | `/cards/:id` | Required | Get single card with full detail |

### Readings
> `Optional*` — works without auth (guest mode), but saves history when authenticated.

| Method | Path | Auth | Body | Description |
|---|---|---|---|---|
| `POST` | `/readings/init` | Optional* | `spreadId, question?` | Start a new reading session |
| `POST` | `/readings/shuffle` | Optional* | `readingId, times` | Shuffle the deck |
| `POST` | `/readings/cut` | Optional* | `readingId, position` | Cut the deck |
| `POST` | `/readings/pick` | Optional* | `readingId, SelectId` | Pick a card |
| `POST` | `/readings/ai-interpret` | Optional* | `readingId` | Request AI interpretation |
| `GET` | `/readings/spread` | Optional* | — | List all spread types |
| `GET` | `/readings/spread/:id` | Optional* | — | Get spread detail |
| `GET` | `/readings/share-image/:readingId` | Optional* | — | Generate shareable PNG image |

---

## Frontend Pages

| Route | Page | Auth Required | Description |
|---|---|---|---|
| `/` | Home | No | Landing page |
| `/login` | Login / Register | No (redirects if authed) | Authentication |
| `/reading` | Reading Setup | Yes | Choose spread, enter question |
| `/reading/session` | Reading Session | Yes | Live shuffle → cut → pick → interpret flow |
| `/library` | Card Library | Yes | Browse all 78 cards |
| `/library/:id` | Card Detail | Yes | Single card with full meaning |
| `/profile` | Profile | Yes | Edit account info + reading history |

---

## Security

BigBode is built with multiple layers of protection:

| Protection | How |
|---|---|
| **HTTP Security Headers** | `helmet` — sets XSS protection, CSP, HSTS, and more on every response |
| **CORS** | Locked to a specific allowed origin; configurable via `FRONTEND_URL` env var |
| **Password Hashing** | `bcrypt` — passwords are never stored in plain text |
| **JWT Authentication** | HS256 tokens with 1-day expiry; stripped from all user-facing responses |
| **Input Validation** | `zod` schemas on every endpoint — malformed requests are rejected with 400 |
| **SQL Injection** | Prisma ORM uses parameterized queries — immune by design |
| **Role-Based Access** | `ADMIN` and `USER` roles enforced at the database level |
| **No Sensitive Leaks** | Passwords, tokens, and stack traces are never returned to the client |
| **Daily Rate Limiting** | `dailyCheck` middleware prevents more than one daily reading per user per day |

> **Note:** Rate limiting on login/register (brute-force protection) is planned for a future release.

---

## Roadmap

### Completed ✅
- [x] Full 78-card deck with upright & reversed meanings
- [x] Spread types by category (General, Love, Career, Health)
- [x] Interactive reading flow: shuffle → cut → pick
- [x] AI interpretation via Gemini 2.5 Flash (BigBen persona, Thai language)
- [x] Mood score on every reading
- [x] Shareable reading image generation (Thai font support)
- [x] Reading history per user
- [x] Saved readings with personal journal notes
- [x] Daily reading limit (one per day per user)
- [x] Guest mode (full reading without an account)
- [x] JWT-secured authentication with role-based access

### Coming Next 🚧
- [ ] **Individual Card Interpretation in Library** — when browsing any card in `/library/:id`, users will be able to ask BigBen for a personal interpretation of that single card, independent of a full spread. No shuffle needed — just you and the card. Reuses the existing Gemini AI integration with a new single-card context prompt.
- [ ] **Rate limiting** on login/register to prevent brute-force attacks (`express-rate-limit`)
- [ ] **Admin dashboard** — manage and create spread types through a UI
- [ ] **AI chat follow-up** — continue the conversation with BigBen after a reading

---

## Deployment Checklist

Use this checklist before going live.

### Environment (set these yourself — never commit `.env` files)
- [ ] `bb_backend/.env` has all required vars: `PORT`, `DATABASE_URL`, `JWT_SECRET`, `GEMINI_API_KEY`, `FRONTEND_URL`, `NODE_ENV=production`
- [ ] `bb_frontend/.env.production` has `VITE_API_URL=https://your-api-domain/api`
- [ ] `JWT_SECRET` is a long, random string (not a placeholder)
- [ ] `.env` is listed in `.gitignore` in both directories

### Database
- [ ] `npx prisma migrate deploy` — run all migrations
- [ ] `npx prisma db seed` — seed all 78 tarot cards
- [ ] `npx prisma generate` — regenerate Prisma client
- [ ] Database is accessible from the backend host (firewall / VPC rules)
- [ ] Automated backups are configured

### Assets
- [ ] Thai font files (`Sarabun`) are present at `bb_backend/src/assets/fonts/` on the production server

### Frontend Build
- [ ] `npm run lint` — no ESLint errors
- [ ] `npm run build` — clean `dist/` output, no build errors

### Infrastructure
- [ ] Backend hosted (Railway / Render / Fly.io / VPS)
- [ ] Frontend static files hosted (Vercel / Netlify / Cloudflare Pages)
- [ ] Custom domain configured with HTTPS (TLS) for both

### Smoke Test After Deploy
- [ ] Frontend loads in browser — no console errors
- [ ] Register a new account
- [ ] Log in — JWT is issued
- [ ] Browse the card library
- [ ] Complete a full reading: shuffle → cut → pick → AI interpret
- [ ] Shareable image generates correctly
- [ ] Save a reading, add a note, then delete it
