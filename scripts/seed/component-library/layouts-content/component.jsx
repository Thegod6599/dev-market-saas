import './component.css';

export function ContentLayout({ eyebrow, title, description, children }) {
  return <main className="cc-content-layout"><header>{eyebrow ? <span>{eyebrow}</span> : null}<h1>{title}</h1>{description ? <p>{description}</p> : null}</header><article>{children}</article></main>;
}
