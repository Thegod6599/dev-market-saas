# Contact Form

A small accessible contact form with required name, email, and message fields.

## Setup and usage

Copy `ContactForm.jsx` and `ContactForm.css` into a React 18+ JSX project. Provide a submit handler to process the form in your app.

```jsx
import { ContactForm } from './ContactForm.jsx';

<ContactForm onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); sendMessage(data); }} />
```

## Props

- `onSubmit`: native form submit callback.
- `submitLabel`: button label, defaults to “Send message”.

## Customize

Override `.cc-contact-form` styles to match your interface. The component makes no network requests and has no additional runtime dependencies.
