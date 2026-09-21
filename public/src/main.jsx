import { createRoot } from 'react-dom/client';
import App from './App';
import LoadingPage from './components/loadingPage/loadingPage.jsx'
import './index.css';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { StrictMode, useContext } from 'react'

function Root() {
  const { loading } = useContext(AuthContext)
  if (loading) {
    return <LoadingPage />
  } else {
    return <App />
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </StrictMode>
);
