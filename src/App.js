import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import useAuth from './hooks/useAuth';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { isInitialised, isAuthenticated, hasRoles } = useAuth();
  const router = useRoutes(routes(isAuthenticated, hasRoles));

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="top-right" />
      {isInitialised ? router : <></>}
    </ThemeProvider>
  );
}

export default App;
