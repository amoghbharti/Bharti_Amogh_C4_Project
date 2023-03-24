import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import routes from './routes';
import useAuth from './hooks/useAuth';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  const { isAuthenticated, hasRole } = useAuth();
  const router = createBrowserRouter(routes(isAuthenticated, hasRole));

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
