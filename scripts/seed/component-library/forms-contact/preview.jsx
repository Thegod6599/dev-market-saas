import { ContactForm } from './component.jsx';
import './component.css';
export default function Preview() { return <ContactForm onSubmit={(event)=>event.preventDefault()} />; }
