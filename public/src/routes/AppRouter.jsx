import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Navbar from '../components/navBar/Navbar';
import Home from '../pages/Home';
import Components from '../pages/Components';
import ComponentDetail from '../pages/ComponentDetail';
import Templates from '../pages/Templates';
import TemplateDetail from '../pages/TemplateDetail';
import Builder from '../pages/Builder';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import Settings from '../pages/Settings';
import LoadingPage from '../components/loadingPage/loadingPage.jsx';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebase/firebase';

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}

function RequireAuthentication({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || (!user && auth.currentUser)) {
    return <LoadingPage />;
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
          notice: 'Please sign in to open your account settings.',
        }}
      />
    );
  }

  return children;
}

const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/components', element: <Components /> },
        { path: '/components/:slug', element: <ComponentDetail /> },
        { path: '/templates', element: <Templates /> },
        { path: '/templates/:slug', element: <TemplateDetail /> },
        { path: '/builder', element: <Builder /> },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/reset-password', element: <ResetPassword /> },
        {
          path: '/settings',
          element: (
            <RequireAuthentication>
              <Settings />
            </RequireAuthentication>
          ),
        },
      ]
    }
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') }
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
