import { useRef, useState } from 'react';
import './component.css';

function accepted(file, accept) {
  if (!accept) return true;
  return accept.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean).some((rule) => {
    if (rule.startsWith('.')) return file.name.toLowerCase().endsWith(rule);
    if (rule.endsWith('/*')) return file.type.startsWith(rule.slice(0, -1));
    return file.type.toLowerCase() === rule;
  });
}
export function FileDropzone({ accept = 'image/*,.pdf', multiple = false, onFilesSelected, label = 'Drop your files here', hint = 'or browse from your device', disabled = false }) {
  const input = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const choose = (list) => {
    const selected = Array.from(list || []);
    const valid = selected.filter((file) => accepted(file, accept));
    if (valid.length !== selected.length) setError('Some files were not accepted. Check the allowed file types.');
    else setError('');
    const result = multiple ? valid : valid.slice(0, 1);
    setFiles(result);
    if (result.length) onFilesSelected?.(result);
    if (input.current) input.current.value = '';
  };
  return <section className={`cc-dropzone ${dragging ? 'is-dragging' : ''} ${disabled ? 'is-disabled' : ''}`} aria-label="File selection">
    <input ref={input} className="cc-dropzone__input" type="file" accept={accept} multiple={multiple} disabled={disabled} onChange={(event) => choose(event.target.files)} aria-label="Choose files" />
    <button type="button" className="cc-dropzone__target" disabled={disabled} onClick={() => input.current?.click()} onDragEnter={(event) => { event.preventDefault(); if (!disabled) setDragging(true); }} onDragOver={(event) => event.preventDefault()} onDragLeave={(event) => { if (event.currentTarget === event.target) setDragging(false); }} onDrop={(event) => { event.preventDefault(); setDragging(false); if (!disabled) choose(event.dataTransfer.files); }} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); input.current?.click(); } }}>
      <span className="cc-dropzone__icon" aria-hidden="true">↑</span><strong>{label}</strong><span>{hint}</span><small>Accepted: {accept}</small>
    </button>
    {error && <p className="cc-dropzone__error" role="alert">{error}</p>}
    {files.length > 0 && <ul className="cc-dropzone__files" aria-live="polite">{files.map((file, index) => <li key={`${file.name}-${index}`}><span aria-hidden="true">▤</span><span><b>{file.name}</b><small>{(file.size / 1024).toFixed(1)} KB</small></span></li>)}</ul>}
  </section>;
}