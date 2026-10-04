# Profile Card

A compact people card with avatar, role, and optional biography text.

## Setup and usage

Copy `ProfileCard.jsx` and `ProfileCard.css` into a React 18+ JSX project.

```jsx
import { ProfileCard } from './ProfileCard.jsx';

<ProfileCard name="Maya Chen" role="Product designer" image="/maya.jpg" imageAlt="Maya Chen" bio="Designing useful tools for thoughtful teams." />
```

## Props

- `name`, `role`: identity and role text.
- `image`: optional avatar URL; an initial is shown when omitted.
- `imageAlt`: alternative text for an informative avatar.
- `bio`: optional supporting description.

## Customize

Use the `.cc-profile-card` selectors to tune shape, spacing, and color. React is the only runtime dependency.
