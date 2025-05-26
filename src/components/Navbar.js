import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <LocalFloristIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Farmers Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/market-prices">
            Market Prices
          </Button>
          <Button color="inherit" component={RouterLink} to="/farmer-dashboard">
            Farmer Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/buyer-dashboard">
            Buyer Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 