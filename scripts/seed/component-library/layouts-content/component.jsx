export function ContentLayout({ title, children }) {
  return <main><header><h1>{title}</h1></header><article>{children}</article></main>;
}