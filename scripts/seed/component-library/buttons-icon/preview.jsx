import { IconButton } from './component.jsx';
import './component.css';
export default function Preview() { return <div style={{display:'flex',gap:12,alignItems:'center'}}><IconButton label="Add item"><span aria-hidden="true">＋</span></IconButton><IconButton label="Favorite"><span aria-hidden="true">♡</span></IconButton><IconButton label="More options"><span aria-hidden="true">···</span></IconButton></div>; }
