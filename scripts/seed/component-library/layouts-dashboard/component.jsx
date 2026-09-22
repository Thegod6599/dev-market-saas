export function DashboardLayout({ sidebar, children }) {
  return <div><aside>{sidebar}</aside><main>{children}</main></div>;
}