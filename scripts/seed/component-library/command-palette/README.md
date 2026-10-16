# Command Palette

## Purpose
Searchable command overlay for fast app actions. It supports the trigger button, Cmd/Ctrl+K, Escape, arrow-key selection, and Enter.

## Setup and import
Copy this folder into a React 18+ JSX app; the component imports `./component.css`.
```jsx
import { CommandPalette } from './command-palette/component.jsx';
```

## Usage
```jsx
<CommandPalette
  commands={[{ label: 'New note', group: 'Create' }, { label: 'Preferences', group: 'Workspace' }]}
  onSelect={(command) => runAction(command)}
/>
```

## Props
- `commands`: array of `{ label, group? }` records.
- `onSelect`: called with the chosen command.
- `placeholder`: search field placeholder.
- `open`: optional controlled visibility; pass with `onOpenChange`.
- `onOpenChange`: receives open state updates.

## Customization
Edit `.cc-command` styles for a different trigger, overlay, or selection palette. No external icon or dialog dependency is used.