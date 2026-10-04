# Activity Timeline

## Purpose
A chronological activity stream for showing who did what, when, and in which context.

## Setup and import
Copy into a React 18+ JSX project. The component loads its included `component.css`.
```jsx
import { ActivityTimeline } from './activity-timeline/component.jsx';
```

## Usage
```jsx
<ActivityTimeline events={[
  { id: '1', actor: 'Rae Kim', action: 'published a draft', detail: 'Release notes', time: '5 min ago', type: 'approval' }
]} onEventClick={(event) => openEvent(event)} />
```

## Props
- `events`: array with unique `id`, `actor`, `action`, `time`, optional `detail` and `type` (`approval`, `comment`, `upload`, or `update`).
- `title`: section title.
- `onEventClick`: called when an event detail is selected.

## Customization
Change the `.cc-timeline` palette and marker modifiers in the local CSS. Empty data gets an intentional empty message.