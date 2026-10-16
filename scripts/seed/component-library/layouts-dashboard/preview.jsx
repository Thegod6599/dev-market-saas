import { DashboardLayout } from './component.jsx';
import './component.css';
export default function Preview() { return <DashboardLayout sidebar={<nav><strong>Northstar</strong><p>Overview</p><p>Projects</p><p>People</p></nav>} header={<strong>Workspace overview</strong>}><h2>Good morning, Maya</h2><p>Your team has 12 active projects and 3 items ready for review.</p></DashboardLayout>; }
