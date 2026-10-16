import { ColumnFooter } from './component.jsx';
import './component.css';
export default function Preview() { return <ColumnFooter columns={[{title:'Explore',links:[{label:'Product',href:'#product'},{label:'Journal',href:'#journal'}]},{title:'Company',links:[{label:'About',href:'#about'},{label:'Contact',href:'#contact'}]}]} />; }
