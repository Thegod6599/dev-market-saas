# Development deployment

## Firebase projects and deployment boundaries

The app uses two separate Firebase projects for different purposes:

- **Hosting project:** `dev-market0`, Hosting site `devmarket`, URL
  https://devmarket.web.app. This is where the production Hosting workflow
  publishes the built frontend.
- **Existing application backend:** the project ID configured by the
  `VITE_FIREBASE_PROJECT_ID` GitHub Actions secret. Keep its Firebase
  Authentication and Firestore data in place. The frontend continues to use
  this project for authentication and user data; do not change that secret to
  `dev-market0`.

Supabase remains the existing source for component-library and Builder data.
Do not replace its URL or publishable key as part of the Hosting migration.

The branch `codex/standalone-component-packages` deploys development builds to
the **`dev` preview channel** on Hosting site `devmarket` in project
`dev-market0`. It must not publish branch pushes to the live channel. The
production workflow deploys to the live channel only after a pull request is
merged into `main`.

## Build configuration

Vite is rooted at `public/`; Firebase Hosting serves
`public/dist/public`. Client-side routes use the existing SPA rewrite.
Static library resources under `public/public/library/` are copied into that
build output.

The build step reads these GitHub Actions secrets by name:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID` (existing application backend; preserve it)
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

The Hosting deployment workflows use `FIREBASE_PRODUCTION_SERVICE_ACCOUNT`
to publish to the Hosting-only project `dev-market0`. Never use that project
ID for the Firebase client configuration. The service-account JSON and any
Supabase service-role credential must never be included in frontend code.

For local Vite development, copy `public/.env.example` to
`public/.env.local` and fill in the existing Firebase backend and Supabase
client configuration. `.env.local` is ignored by Git. The importer separately
uses `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in a local developer
shell.

## Firestore rules

The repository declares `firestore.rules` in `firebase.json`, but the Hosting
workflows deploy **Hosting only**. They do not deploy Firestore rules. Before
deploying the repository rules, compare them with the currently deployed rules
in the existing application-backend project; a rules deployment replaces that
project's rules and must not be aimed at `dev-market0`.

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

## User-data storage boundaries

The intended data boundary is Firebase Authentication for sign-in identity,
Firestore for per-user profile/settings and Feedback records, and Supabase for
the shared component-library catalogue only. The Builder is currently a
Coming Soon placeholder and does not save user projects. Existing Supabase
tables named for profiles, favorites, settings, projects, or feedback are not
used by the current application flow merely because they exist in the schema.

The browser Supabase client must not forward Firebase ID tokens or maintain a
Supabase user session. Account deletion reauthenticates the user, removes
their Firestore feedback and `users/{uid}` profile/settings document, then
deletes their Firebase Authentication account. It does not delete or modify
shared Supabase component-library records.

This is an application-code boundary, not a claim that the Supabase project
contains no historical data. Existing table contents, database logs, and
provider backups should be audited separately if data erasure is required.
