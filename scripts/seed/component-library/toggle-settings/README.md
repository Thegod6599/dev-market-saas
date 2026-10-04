# Toggle Settings

A settings panel for independent preferences. Switches support pointer, Enter, and Space through native button behavior.

```jsx
import { ToggleSettings } from './toggle-settings/component.jsx';

<ToggleSettings onChange={(id, enabled) => savePreference(id, enabled)} />
```

Props: `settings` array of `{ id, title, description, enabled }`, controlled `values` keyed by setting ID, `onChange(id, enabled)`, and `title`. Without `values`, the component manages its own state.