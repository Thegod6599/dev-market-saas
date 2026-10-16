import { ModernNavbar } from './component.jsx';
import './component.css';
export default function Preview() { return <ModernNavbar links={[{label:'Product',href:'#product'},{label:'Journal',href:'#journal'},{label:'About',href:'#about'}]} action={{label:'Get started',href:'#start'}} />; }
