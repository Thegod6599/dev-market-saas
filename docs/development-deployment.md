# Development deployment

## Current development target

The branch `codex/standalone-component-packages` deploys to the live Firebase
Hosting site for project `first-project-81a57`. The current site URL is
https://first-project-81a57.web.app. GitHub Actions runs on pushes to that
branch, installs the frozen pnpm lockfile, runs the root build (typecheck and
workspace builds), then deploys the Vite output to the live Hosting channel.

Vite is rooted at `public/`; Firebase Hosting serves `public/dist/public`.
Client-side routes use the existing SPA rewrite. Static library resources
under `public/public/library/` are copied into that build output.

## Actions configuration

The build step reads these GitHub Actions secrets by name:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The Hosting deploy step also reads `FIREBASE_SERVICE_ACCOUNT`. Only the
build step receives the Vite variables. Vite embeds client configuration in
the browser bundle; keep Firebase service-account and Supabase service-role
credentials out of frontend code.

For local Vite development, copy `public/.env.example` to
`public/.env.local` and fill in the same Firebase and Supabase client
configuration. `.env.local` is ignored by Git. The importer separately uses
`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in a local developer shell.

To move to another project, replace the related GitHub Actions secrets
together: Firebase web app settings, the Hosting project ID
(`VITE_FIREBASE_PROJECT_ID`), Firebase service account, and Supabase URL and
publishable key. The app source contains no project values.

## Component packages

Each importable source folder includes `metadata.json`, an implementation
(`component.jsx` or `<ComponentName>.jsx`), its CSS file, and `README.md`.
The importer validates the folder, generates a ZIP containing
`<ComponentName>/<ComponentName>.jsx`, `<ComponentName>.css`, and
`README.md`, stages it under `public/public/library/packages/`, and stores
the relative `library/packages/<slug>.zip` path in the existing Supabase
`components.code_reference` field. An optional `preview.svg` is staged
under `public/public/library/previews/`. Firebase Hosting serves these files
as static resources; no Supabase Storage bucket or schema change is needed.
