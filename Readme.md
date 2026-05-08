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
- [Frontend Pages](#frontend-pages)
- [Security](#security)
- [Roadmap](#roadmap)
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
- JWT-authenticated sessions
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
│       ├── schema.prisma           # Database models
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

Create `bb_backend/.env` with your database, JWT, Gemini, and CORS settings.

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
| **HTTP Security Headers** | Security headers set on every response |
| **CORS** | Locked to a specific allowed origin; configurable via `FRONTEND_URL` env var |
| **Password Hashing** | Passwords are hashed at rest — never stored in plain text |
| **JWT Authentication** | Short-lived tokens; never returned in user-facing responses after issue |
| **Input Validation** | Schema validation on every endpoint — malformed requests are rejected |
| **SQL Injection** | ORM with parameterized queries — immune by design |
| **Role-Based Access** | Access control enforced at the database level |
| **No Sensitive Leaks** | Passwords, tokens, and stack traces are never returned to the client |
| **Rate Limiting** | Applied on authentication and all API endpoints to prevent abuse |

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
- [ ] **Admin dashboard** — manage and create spread types through a UI
- [ ] **AI chat follow-up** — continue the conversation with BigBen after a reading

