import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from '../components/navBar/Navbar';
import Home from '../pages/Home';
import Components from '../pages/Components';
import ComponentDetail from '../pages/ComponentDetail';
import Templates from '../pages/Templates';
import TemplateDetail from '../pages/TemplateDetail';
import Builder from '../pages/Builder';
import Login from '../pages/Login';

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/components', element: <Components /> },
        { path: '/components/:slug', element: <ComponentDetail /> },
        { path: '/templates', element: <Templates /> },
        { path: '/templates/:slug', element: <TemplateDetail /> },
        { path: '/builder', element: <Builder /> },
        { path: '/login', element: <Login /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') }
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
