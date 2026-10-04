import './component.css';

export function ContactForm({ onSubmit, submitLabel = 'Send message' }) {
  return <form className="cc-contact-form" onSubmit={onSubmit}><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label><label>Message<textarea name="message" rows="4" required /></label><button type="submit">{submitLabel}</button></form>;
}
