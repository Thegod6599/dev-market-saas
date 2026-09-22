# DevMarket sample library

The folders under `scripts/seed/component-library/` are safe-to-rerun sample
records for the developer importer. Each folder contains:

- `metadata.json` — the Supabase component metadata
- `component.jsx` — the referenced component source

Run the importer with a Supabase service-role key kept in the shell environment:

```sh
SUPABASE_URL="https://your-project.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="..." \
pnpm --filter @workspace/scripts import-components scripts/seed/component-library
```

The service-role key is only for this developer tool. Never use it in the
browser or store it in a `VITE_` variable.