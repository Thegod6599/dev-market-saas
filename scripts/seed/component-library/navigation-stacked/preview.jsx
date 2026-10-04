import { StackedNavigation } from './component.jsx';
import './component.css';
export default function Preview() { return <StackedNavigation title="Workspace" activeHref="#projects" items={[{label:'Overview',href:'#overview'},{label:'Projects',href:'#projects'},{label:'People',href:'#people'},{label:'Settings',href:'#settings'}]} />; }
