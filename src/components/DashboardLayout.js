import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShowChart as ShowChartIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';

const drawerWidth = 240;

const DashboardLayout = ({ children, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { 
    userProfile, 
    updateProfile, 
    updatePreferences, 
    updateNotificationPreferences,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification
  } = useMarket();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    handleProfileMenuClose();
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id);
    // Add navigation or action based on notification type
  };

  const handleDeleteNotification = (event, notificationId) => {
    event.stopPropagation();
    deleteNotification(notificationId);
  };

  const handleProfileUpdate = (updates) => {
    updateProfile(updates);
    handleSettingsClose();
  };

  const handlePreferenceUpdate = (updates) => {
    updatePreferences(updates);
  };

  const handleNotificationPreferenceUpdate = (updates) => {
    updateNotificationPreferences(updates);
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          FarmConnect
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/market-prices')}>
            <ListItemIcon>
              <ShowChartIcon />
            </ListItemIcon>
            <ListItemText primary="Market Prices" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/community')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Community" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={unreadNotifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleProfileMenuOpen}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {userProfile?.name?.[0] || 'U'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px'
        }}
      >
        {children}
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={Boolean(profileAnchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <MenuItem onClick={handleSettingsOpen}>
          <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
        PaperProps={{
          sx: { 
            width: 360,
            maxHeight: 400,
            borderRadius: 2
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          {unreadNotifications > 0 && (
            <Button
              size="small"
              onClick={() => {
                markAllNotificationsAsRead();
                handleNotificationMenuClose();
              }}
            >
              Mark all as read
            </Button>
          )}
        </Box>
        <Divider />
        <MuiList sx={{ p: 0 }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MuiListItem
                key={notification.id}
                button
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                  '&:hover': { bgcolor: 'action.selected' }
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: notification.type === 'order' ? 'primary.main' : 'secondary.main' }}>
                    {notification.type === 'order' ? 'O' : notification.type === 'price' ? 'P' : 'M'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="text.primary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notification.timestamp).toLocaleString()}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => handleDeleteNotification(e, notification.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </MuiListItem>
            ))
          ) : (
            <MuiListItem>
              <ListItemText
                primary="No notifications"
                sx={{ textAlign: 'center', color: 'text.secondary' }}
              />
            </MuiListItem>
          )}
        </MuiList>
      </Menu>

      {/* Settings Dialog */}
      <Dialog
        open={settingsOpen}
        onClose={handleSettingsClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>Profile Settings</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={userProfile?.name || ''}
              onChange={(e) => handleProfileUpdate({ name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={userProfile?.email || ''}
              onChange={(e) => handleProfileUpdate({ email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Notification Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={userProfile?.preferences?.notifications?.newOrders}
                  onChange={(e) => handleNotificationPreferenceUpdate({ newOrders: e.target.checked })}
                />
              }
              label="New Orders"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={userProfile?.preferences?.notifications?.priceUpdates}
                  onChange={(e) => handleNotificationPreferenceUpdate({ priceUpdates: e.target.checked })}
                />
              }
              label="Price Updates"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={userProfile?.preferences?.notifications?.marketAlerts}
                  onChange={(e) => handleNotificationPreferenceUpdate({ marketAlerts: e.target.checked })}
                />
              }
              label="Market Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={userProfile?.preferences?.notifications?.deliveryUpdates}
                  onChange={(e) => handleNotificationPreferenceUpdate({ deliveryUpdates: e.target.checked })}
                />
              }
              label="Delivery Updates"
            />
            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Appearance
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={userProfile?.preferences?.theme === 'dark'}
                  onChange={(e) => handlePreferenceUpdate({ theme: e.target.checked ? 'dark' : 'light' })}
                />
              }
              label="Dark Mode"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSettingsClose}>Cancel</Button>
          <Button onClick={handleSettingsClose} variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardLayout; 