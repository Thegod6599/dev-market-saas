import { SplitHero } from './component.jsx';
import './component.css';
export default function Preview() { return <SplitHero eyebrow="Workspace" title="See the whole picture." description="Keep your team's projects, people, and plans connected." action={{href:'#tour',label:'Explore the tour'}} visual={<div style={{padding:24}}><strong>Project overview</strong><p>12 active · 4 in review</p></div>} />; }
