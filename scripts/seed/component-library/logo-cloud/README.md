# Logo Cloud

A typographic client and collaborator strip built with text-based marks, so it is ready to use without image assets or icon packages.

```jsx
import { LogoCloud } from './logo-cloud/component.jsx';

<LogoCloud logos={[
  { name: 'Fieldwork', mark: 'F', style: 'custom' },
  { name: 'Morrow', mark: 'morrow', style: 'morrow' },
]} />
```

Props: `logos` is an array of `{ name, mark, style }`; `label` sets the section's accessible name. Known style values are `northstar`, `morrow`, `atelier`, `common`, `rook`, and `forma`; unknown values use the default mark style.