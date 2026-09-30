# DevMarket sample library

Every importable component directory includes `metadata.json`, a JSX file,
its complete CSS file, and `README.md`. The JSX imports its companion CSS.
The importer accepts `component.jsx` plus `component.css`, or a named pair
such as `ActionButtonSet.jsx` and `ActionButtonSet.css`. An optional
`preview.svg` is copied to the Vite public directory.

The importer creates a ZIP under
`public/public/library/packages/<slug>.zip` and stores that relative Hosting
path in the existing `components.code_reference` field. It preserves
category, tags, status, VIP metadata, and component-tag relationships. No
Supabase schema or Storage bucket change is needed.

Pass one component directory or a parent directory containing component
directories. From the repository root, for example:

```sh
SUPABASE_URL="https://your-project.supabase.co" \
SUPABASE_SERVICE_ROLE_KEY="..." \
pnpm --filter @workspace/scripts import-components scripts/seed/component-library/buttons-action
```

The importer resolves paths relative to either the repository root or the
scripts package. The service-role key is local developer tooling only. Never
use it in frontend code or a `VITE_` variable.
