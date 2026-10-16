# Pagination

A compact page navigator with a page summary, previous/next controls, and an ellipsized page window.

```jsx
import { Pagination } from './pagination/component.jsx';

<Pagination totalPages={24} onPageChange={(page) => loadPage(page)} />
```

Props: `totalPages` (default `12`), controlled `page`, `defaultPage`, `onPageChange(page)`, and `siblingCount` (default `1`). Invalid page values are clamped to available pages.