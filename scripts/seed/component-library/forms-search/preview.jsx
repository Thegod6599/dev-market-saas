import { SearchForm } from './component.jsx';
import './component.css';
export default function Preview() { return <SearchForm onSubmit={(event)=>event.preventDefault()} />; }
