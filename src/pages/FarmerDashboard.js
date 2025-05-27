import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  LinearProgress,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
  Tabs,
  Tab,
  Alert,
  Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardLayout from '../components/DashboardLayout';
import { useMarket } from '../context/MarketContext';

const FarmerDashboard = () => {
  const { marketData } = useMarket();
  const [inventory, setInventory] = useState([
    { id: 1, product: 'Tomatoes', quantity: 100, unit: 'kg', price: 2.50, trend: 'up', lastUpdated: new Date() },
    { id: 2, product: 'Potatoes', quantity: 200, unit: 'kg', price: 1.80, trend: 'down', lastUpdated: new Date() },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product: '',
    quantity: '',
    unit: 'kg',
    price: ''
  });
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddProduct = () => {
    if (newProduct.product && newProduct.quantity && newProduct.price) {
      setInventory([
        ...inventory,
        {
          id: inventory.length + 1,
          ...newProduct,
          quantity: Number(newProduct.quantity),
          price: Number(newProduct.price),
          trend: 'stable',
          lastUpdated: new Date()
        }
      ]);
      setNewProduct({ product: '', quantity: '', unit: 'kg', price: '' });
      setOpenDialog(false);
      showSnackbar('Product added successfully!', 'success');
    }
  };

  const handleDeleteProduct = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
    showSnackbar('Product deleted successfully!', 'info');
  };

  const handleMenuOpen = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProduct(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Calculate total inventory value
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  // Calculate inventory statistics
  const lowStockItems = inventory.filter(item => item.quantity < 50).length;
  const trendingUpItems = inventory.filter(item => item.trend === 'up').length;

  return (
    <DashboardLayout title="Farmer Dashboard">
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Inventory Value
              </Typography>
              <Typography variant="h4" component="div">
                ${totalValue.toFixed(2)}
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                sx={{ 
                  mt: 2,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                  }
                }} 
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Last updated: {new Date().toLocaleTimeString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Low Stock Items
              </Typography>
              <Typography variant="h4" component="div" color="warning.main">
                {lowStockItems}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Items requiring attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Trending Up
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {trendingUpItems}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Products with increasing demand
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Inventory Management */}
        <Grid item xs={12}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Inventory Management</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Add Product
                </Button>
              </Box>
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 2 }}
              >
                <Tab label="All Products" />
                <Tab label="Low Stock" />
                <Tab label="Trending Up" />
              </Tabs>
              <List>
                {inventory
                  .filter(item => {
                    if (activeTab === 1) return item.quantity < 50;
                    if (activeTab === 2) return item.trend === 'up';
                    return true;
                  })
                  .map((item) => (
                    <ListItem
                      key={item.id}
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateX(5px)' }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">{item.product}</Typography>
                            <Chip
                              size="small"
                              label={`$${item.price}/${item.unit}`}
                              color="primary"
                              variant="outlined"
                            />
                            <Tooltip title={item.trend === 'up' ? 'Price trending up' : 'Price trending down'}>
                              {item.trend === 'up' ? 
                                <TrendingUpIcon color="success" /> : 
                                <TrendingDownIcon color="error" />
                              }
                            </Tooltip>
                            {item.quantity < 50 && (
                              <Chip
                                size="small"
                                label="Low Stock"
                                color="warning"
                                variant="outlined"
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                            <Typography variant="body2">
                              {item.quantity} {item.unit} available
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="edit" sx={{ color: 'primary.main' }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="more"
                          onClick={(e) => handleMenuOpen(e, item)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Market Insights */}
        <Grid item xs={12}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Market Insights</Typography>
                <Badge badgeContent={3} color="primary">
                  <NotificationsIcon color="action" />
                </Badge>
              </Box>
              <Grid container spacing={2}>
                {marketData.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card 
                      variant="outlined"
                      sx={{ 
                        transition: 'all 0.2s',
                        '&:hover': { 
                          transform: 'translateY(-5px)',
                          boxShadow: 3
                        }
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item.product}
                        </Typography>
                        <Typography variant="h4" color="primary.main" gutterBottom>
                          ${item.price}/{item.unit}
                        </Typography>
                        <Typography color="text.secondary">
                          {item.market}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Product Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{ sx: { borderRadius: 2 } }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={newProduct.product}
            onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            label="Unit"
            fullWidth
            value={newProduct.unit}
            onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            label="Price per Unit"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} variant="contained" sx={{ borderRadius: 2 }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Product Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Product
        </MenuItem>
        <MenuItem onClick={() => {
          handleDeleteProduct(selectedProduct?.id);
          handleMenuClose();
        }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Product
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <TrendingUpIcon fontSize="small" sx={{ mr: 1 }} />
          View Price History
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
};

export default FarmerDashboard; 