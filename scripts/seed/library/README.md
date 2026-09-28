# DevMarket sample library

Every importable component folder includes `metadata.json`, `component.jsx`,
`component.css`, and `README.md`. The importer checks this package contract
before writing component rows and stores `library/packages/<slug>.zip` in the
existing `components.code_reference` field. A sample preview is served from
`public/public/library/previews`.

The Firebase Hosting configuration builds the existing Vite frontend and
serves static library resources from its output. No Supabase schema, Storage
bucket, or service-role key in browser code is needed.

The developer importer requires a server-side service-role key. Never use a
`VITE_` variable for it.
