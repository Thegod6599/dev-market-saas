# Notification Center

## Purpose
A notification inbox with all/unread/read filters, visible unread distinction, per-item read actions, and bulk mark-read behavior.

## Setup and import
Copy the folder into a React 18+ JSX app. Its stylesheet is imported by the component.
```jsx
import { NotificationCenter } from './notification-center/component.jsx';
```

## Usage
```jsx
<NotificationCenter
  notifications={[{ id: '42', title: 'Build finished', detail: 'Preview is ready', time: '2m', unread: true, kind: 'review' }]}
  onRead={(item) => console.log('read', item.id)}
  onMarkAllRead={() => console.log('cleared')}
/>
```

## Props
- `notifications`: records with unique `id`, `title`, `detail`, `time`, `unread`, optional `kind`.
- `onRead`: called with a notification when marked read.
- `onMarkAllRead`: called after bulk action.
- `title`: section label.

## Customization
Edit component-scoped `.cc-notices` rules and icon-kind modifiers. Read state is initialized from the provided array and managed locally.