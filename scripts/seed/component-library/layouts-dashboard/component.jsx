import './component.css';

export function DashboardLayout({ sidebar, children, header }) {
  return <div className="cc-dashboard-layout"><aside>{sidebar}</aside><main>{header ? <header>{header}</header> : null}<section>{children}</section></main></div>;
}
