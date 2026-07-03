# React UI Builder & Template Library

A SaaS platform for browsing, previewing, and building React UI components and page templates.

## Stack

- **React + Vite** — frontend framework and dev server
- **React Router v6** — client-side routing
- **Firebase** — authentication (Google Auth) and Firestore database (initialized, not yet wired to UI)
- **TypeScript** — type safety across the project
- **pnpm workspaces** — monorepo package management

## Project Structure

```
artifacts/ui-builder/src/
├── pages/
│   ├── Home.jsx             # / — landing page
│   ├── Components.jsx       # /components — component library listing
│   ├── ComponentDetail.jsx  # /components/:slug — single component detail
│   ├── Templates.jsx        # /templates — template library listing
│   ├── TemplateDetail.jsx   # /templates/:slug — single template detail
│   ├── Builder.jsx          # /builder — visual builder (private route)
│   └── Login.jsx            # /login — authentication page (private route)
├── components/
│   └── Navbar.jsx           # Site-wide navigation bar
├── data/
│   ├── components.js        # Component data (empty — populate later)
│   └── templates.js         # Template data (empty — populate later)
├── routes/
│   └── AppRouter.jsx        # React Router v6 router definition
├── firebase.js              # Firebase app, auth, and Firestore initialization
└── App.tsx                  # Root component — mounts AppRouter
```

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

Firebase is initialized in `src/firebase.js`. To connect to your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project and register a web app
3. Copy the config values into environment variables:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Set these as secrets in the Replit Secrets panel (the lock icon in the sidebar).

## Run & Operate

```bash
# Start development server
pnpm --filter @workspace/ui-builder run dev

# Typecheck
pnpm --filter @workspace/ui-builder run typecheck

# Full workspace typecheck
pnpm run typecheck
```

## Current State

This is a base scaffold — all pages render placeholder text only. No auth logic, no Firebase reads/writes, and no UI styling have been implemented yet.

## Next Steps

- Add Firebase credentials to Replit Secrets
- Populate `data/components.js` and `data/templates.js` with real data
- Implement authentication UI on the Login page
- Add route guards for private routes (`/builder`)
- Build out the visual UI Builder
