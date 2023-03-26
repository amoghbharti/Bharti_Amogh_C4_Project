import { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavigationBar.css';
import useAuth from '../../hooks/useAuth';
import { authTabs, nonAuthTabs } from './navTabInfo';
import SearchBar from '../search/SearchBar';
import Logo from '../logo/Logo';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';
import { setSearchValue } from '../../store/slices/search';
import { debounce } from '../../utils/functions';

function NavigationBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, hasRoles, resetAuthData } = useAuth();

  // debounce for search bar
  const handleSearch = useMemo(() =>
    debounce((e) => dispatch(setSearchValue(e.target.value)), 500)
  , [dispatch]);

  const handleLogout = () => {
    resetAuthData();
    navigate('/login');
  }

  const checkRoles = (roles = []) => {
    const set = new Set(roles);
    return hasRoles.find((userRole) => set.has(userRole.name));
  }

  return (
    <AppBar position="static" classes={{ colorPrimary: "navBar" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo />
          <Box className="navSearch" >
            {isAuthenticated && <SearchBar onChange={handleSearch} />}
          </Box>

          <Box>
            {isAuthenticated
              ? authTabs.map((tab) => (
                checkRoles(tab.allowedRoles)
                  ? <Link
                    key={tab.path}
                    component={NavLink}
                    to={tab.path}
                    color="inherit"
                    variant="subtitle2"
                    sx={{ px: 2 }}
                  >
                    {tab.label}
                  </Link>
                  : null
              ))
              : nonAuthTabs.map((tab) => (
                <Link
                  key={tab.path}
                  component={NavLink}
                  to={tab.path}
                  color="inherit"
                  variant="subtitle2"
                  sx={{ px: 2 }}
                >
                  {tab.label}
                </Link>
              ))}
          </Box>

          {isAuthenticated && <Box sx={{ px: 2 }}>
            <Button onClick={handleLogout} variant="contained" color="secondary">
              Logout
            </Button>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavigationBar;