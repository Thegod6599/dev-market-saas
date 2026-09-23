export function ContactForm({ onSubmit }) {
  return <form onSubmit={onSubmit}><label>Name<input name="name" /></label><label>Email<input name="email" type="email" /></label><button>Send message</button></form>;
}