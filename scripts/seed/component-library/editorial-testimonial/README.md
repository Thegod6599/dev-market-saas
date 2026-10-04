# Editorial Testimonial

## Purpose
A quote-forward attribution piece with literary display type and a quiet identifying footer, distinct from a profile card.

## Setup and import
Copy this folder into a React 18+ JSX project. It imports its component-scoped stylesheet.
```jsx
import { EditorialTestimonial } from './editorial-testimonial/component.jsx';
```

## Usage
```jsx
<EditorialTestimonial
  quote="We finally have a shared language for the work."
  author="Mara Ellis"
  role="Creative Director"
  organization="Fieldwork Studio"
  context="A note on working together"
/>
```

## Props
- `quote`: testimonial copy.
- `author`: attributed person.
- `role`, `organization`: author descriptor.
- `context`: optional short framing line.
- `portrait`: optional image URL; initials render when omitted.
- `className`: optional extra root class.

## Customization
Edit `.cc-testimonial` color, display typography, and decorative ring treatment locally. No global font or image dependency is required.