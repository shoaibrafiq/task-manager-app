import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

/**
 * Header component for navigation across the app
 * Uses MUI AppBar for modern styling
 */
const Header: React.FC = () => {
  const location = useLocation();
  
  // Helper function to determine if a route is active
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };
  
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task Manager
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              component={RouterLink} 
              to="/"
              variant={isActive('/') ? 'outlined' : 'text'}
              color="inherit"
            >
              Home
            </Button>
            <Button 
              component={RouterLink} 
              to="/to-do"
              variant={isActive('/to-do') ? 'outlined' : 'text'}
              color="inherit"
            >
              To Do
            </Button>
            <Button 
              component={RouterLink} 
              to="/done"
              variant={isActive('/done') ? 'outlined' : 'text'}
              color="inherit"
            >
              Done
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
