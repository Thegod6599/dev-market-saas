# Search Form

A labeled search field and submit action that uses the browser's native form behavior.

## Setup and usage

Copy `SearchForm.jsx` and `SearchForm.css` into a React 18+ JSX project.

```jsx
import { SearchForm } from './SearchForm.jsx';

<SearchForm onSubmit={(event) => { event.preventDefault(); search(event.currentTarget.query.value); }} />
```

## Props

- `onSubmit`: native form submit callback.
- `label`: visible field label, defaults to “Search”.
- `placeholder`: input hint.
- `buttonLabel`: submit text.

## Customize

Use the `.cc-search-form` selectors for colors and sizing. No additional runtime dependencies are required.
