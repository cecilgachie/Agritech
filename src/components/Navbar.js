import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

const Navbar = () => {
  return (
    <AppBar position="static" elevation={0} sx={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
      <Toolbar sx={{ minHeight: 64 }}>
        <LocalFloristIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
          Farmers Marketplace
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ color: 'text.primary' }}>
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/market-prices" sx={{ color: 'text.primary' }}>
            Market Prices
          </Button>
          <Button color="inherit" component={RouterLink} to="/farmer-dashboard" sx={{ color: 'text.primary' }}>
            Farmer Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/buyer-dashboard" sx={{ color: 'text.primary' }}>
            Buyer Dashboard
          </Button>
          <Button color="inherit" component={RouterLink} to="/login" sx={{ color: 'text.primary' }}>
            Login
          </Button>
          <Button color="inherit" component={RouterLink} to="/register" sx={{ color: 'text.primary' }}>
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 