# React UI Builder & Template Library

A SaaS platform for browsing, previewing, and building React UI components and page templates.

## Project Structure

```
├── public/                  # React frontend (Vite + React Router)
│   ├── src/
│   │   ├── firebase/
│   │   │   └── firebase.js  # Firebase app, auth, Firestore
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Components.jsx
│   │   │   ├── ComponentDetail.jsx
│   │   │   ├── Templates.jsx
│   │   │   ├── TemplateDetail.jsx
│   │   │   ├── Builder.jsx
│   │   │   └── Login.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── data/
│   │   │   ├── components.js
│   │   │   └── templates.js
│   │   ├── routes/
│   │   │   └── AppRouter.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Express backend (Node.js API)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── index.ts
│   │   │   └── health.ts
│   │   ├── lib/
│   │   │   └── logger.ts
│   │   ├── app.ts
│   │   └── index.ts
│   ├── build.mjs
│   └── package.json
│
├── lib/                     # Shared workspace libraries
│   ├── api-spec/            # OpenAPI spec + codegen
│   ├── api-client-react/    # Generated React Query hooks
│   ├── api-zod/             # Generated Zod schemas
│   └── db/                  # Drizzle ORM schema + DB client
│
└── README.md
```

## Stack

- **React + Vite** — frontend with JSX
- **React Router v7** — client-side routing
- **Firebase** — Google Auth + Firestore (initialized, not yet wired to UI)
- **Express** — backend API server
- **pnpm workspaces** — monorepo package management

## Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/components` | Components | Public |
| `/components/:slug` | Component Detail | Public |
| `/templates` | Templates | Public |
| `/templates/:slug` | Template Detail | Public |
| `/builder` | Builder | Private (no guard yet) |
| `/login` | Login | Public |

## Firebase Setup

Firebase is initialized in `public/src/firebase/firebase.js`. To connect your Firebase project, add these to Replit Secrets (the lock icon in the sidebar):

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Get these values from: [Firebase Console](https://console.firebase.google.com) → Project Settings → General → Your apps.

## Run & Operate

```bash
# Frontend (React)
pnpm --filter @workspace/ui-builder run dev

# Backend (Express API)
pnpm --filter @workspace/api-server run dev

# Full typecheck
pnpm run typecheck
```

## Current State

Base scaffold only — all pages render placeholder text. No auth logic, no Firebase reads/writes, and no UI styling implemented yet.

## Next Steps

1. Add Firebase credentials to Replit Secrets
2. Populate `public/src/data/components.js` and `templates.js`
3. Implement Google Sign-In on the Login page
4. Add route guards for `/builder`
5. Build out the UI Builder feature
