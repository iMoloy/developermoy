<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0a0f1e,50:141b2e,100:252e47&height=160&section=header&text=DeveloperMoy&fontSize=42&fontColor=ffffff&fontAlignY=38&desc=Personal%20Developer%20Platform%20by%20Moloy%20Krishna%20Paul&descAlignY=58&descSize=14&descColor=6488fc&animation=fadeIn" width="100%" alt="DeveloperMoy banner" />

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
  [![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)](https://expressjs.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://mongoosejs.com)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## 📖 Overview

**DeveloperMoy** is a full-stack personal developer platform — a monorepo containing a Next.js 15 client (App Router) and an Express.js API server, built with a premium, modern design system.

---

## 🏗️ Architecture

```
developermoy/
├── client/                  # Next.js 15 App Router (→ Vercel)
│   ├── src/
│   │   ├── app/             # App Router pages & layouts
│   │   ├── components/ui/   # Shadcn UI components
│   │   ├── lib/             # Utilities (cn, etc.)
│   │   └── types/           # Global TypeScript types
│   ├── tailwind.config.ts   # Custom design tokens
│   └── components.json      # Shadcn UI config
│
├── server/                  # Express.js API (→ Render)
│   └── src/
│       ├── config/          # DB & CORS config
│       ├── routes/v1/       # Versioned API routes
│       ├── middleware/      # Error handler, auth, etc.
│       └── types/           # Server-side types
│
├── turbo.json               # Turborepo pipeline
└── package.json             # npm workspaces root
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) + React 18 |
| **API Server** | Express.js 4 + TypeScript |
| **Database** | MongoDB via Mongoose |
| **Auth** | Better Auth |
| **Styling** | Tailwind CSS 3 + DaisyUI + Shadcn UI |
| **Fonts** | Fontshare — Satoshi & Cabinet Grotesk |
| **Build Tool** | Turborepo |
| **Hosting** | Vercel (client) + Render (server) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10
- MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/iMoloy/developermoy.git
cd developermoy

# Install all workspace dependencies
npm install
```

### Environment Setup

```bash
# Client
cp client/.env.example client/.env.local
# → Set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_APP_URL

# Server
cp server/.env.example server/.env
# → Set MONGODB_URI, BETTER_AUTH_SECRET, CLIENT_URL
```

### Development

```bash
# Run both client and server concurrently
npm run dev

# Client → http://localhost:3000
# Server → http://localhost:5000
```

---

## 🔗 Links

- 🌐 **Portfolio** → [moloy.is-a.dev](https://moloy.is-a.dev)
- 🐙 **GitHub** → [github.com/iMoloy/developermoy](https://github.com/iMoloy/developermoy)

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:252e47,50:141b2e,100:0a0f1e&height=80&section=footer&animation=fadeIn" width="100%" alt="Footer" />
  <sub>Made with ❤️ by <strong>Moloy Krishna Paul</strong></sub>
</div>
