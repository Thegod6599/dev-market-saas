# Workspace Sidebar

## Purpose
A vertical, sectioned navigation rail for workspace tools. Group headings toggle their own sections; the rail can also collapse to compact letter markers.

## Setup and import
Copy the folder into a React 18+ JSX project. `component.jsx` imports the included `component.css`.
```jsx
import { WorkspaceSidebar } from './workspace-sidebar/component.jsx';
```

## Usage
```jsx
<WorkspaceSidebar
  activeHref="/projects"
  groups={[{ label: 'Work', items: [{ label: 'Projects', href: '/projects' }] }]}
  onNavigate={(item) => console.log(item.href)}
/>
```

## Props
- `groups`: array of `{ label, items: [{ label, href }] }`; defaults to sample workspace sections.
- `activeHref`: destination marked current; defaults to `#overview`.
- `collapsed`: initial compact state.
- `onNavigate`: optional callback receiving the chosen item.
- `title`: workspace name.

## Customization
Use the `.cc-workspace` selectors in `component.css` to adjust rail width, palette, and active treatment. Internal state handles collapse and group disclosure.