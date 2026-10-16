# Modal Dialog

A compact confirmation dialog. It can be opened from its demo trigger or controlled externally; Escape and backdrop clicks dismiss it, and the previously focused element is restored when it closes.

```jsx
import { ModalDialog } from './modal-dialog/component.jsx';

<ModalDialog onConfirm={() => archiveDraft()} />
```

Props: `open` for controlled visibility, `defaultOpen`, `onOpenChange(open)`, `title`, `description`, `confirmLabel`, and `onConfirm()`. The built-in trigger remains available as a standalone preview affordance.