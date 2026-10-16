# Split Action Button

A primary action paired with a compact menu of related options.

## Setup and usage

Copy `SplitButton.jsx` and `SplitButton.css` into a React 18+ JSX project.

```jsx
import { SplitButton } from './SplitButton.jsx';

<SplitButton label="Save draft" options={['Save as template', 'Duplicate']} onSelect={(value) => console.log(value)} />
```

## Props

- `label`: primary action text.
- `options`: strings displayed in the related actions menu.
- `onClick`: handler for the primary action.
- `onSelect(value)`: called when a menu option is selected.

## Customize

Adjust the `.cc-split-button` rules to match your palette and shape. React is the only runtime dependency.
