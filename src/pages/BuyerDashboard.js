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
  Snackbar,
  Avatar,
  Rating,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DashboardLayout from '../components/DashboardLayout';
import { useMarket } from '../context/MarketContext';

const BuyerDashboard = () => {
  const { marketData } = useMarket();
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      product: 'Tomatoes', 
      quantity: 50, 
      unit: 'kg', 
      price: 2.50, 
      status: 'Pending',
      supplier: 'John Smith',
      rating: 4.5,
      lastUpdated: new Date()
    },
    { 
      id: 2, 
      product: 'Potatoes', 
      quantity: 100, 
      unit: 'kg', 
      price: 1.80, 
      status: 'Delivered',
      supplier: 'Sarah Johnson',
      rating: 4.8,
      lastUpdated: new Date()
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newOrder, setNewOrder] = useState({
    product: '',
    quantity: '',
    unit: 'kg',
    price: ''
  });
  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    quantity: '',
    unit: 'kg',
    deliveryAddress: '',
    notes: ''
  });

  const handleAddOrder = () => {
    if (newOrder.product && newOrder.quantity && newOrder.price) {
      setOrders([
        ...orders,
        {
          id: orders.length + 1,
          ...newOrder,
          quantity: Number(newOrder.quantity),
          price: Number(newOrder.price),
          status: 'Pending',
          supplier: 'New Supplier',
          rating: 0,
          lastUpdated: new Date()
        }
      ]);
      setNewOrder({ product: '', quantity: '', unit: 'kg', price: '' });
      setOpenDialog(false);
      showSnackbar('Order placed successfully!', 'success');
    }
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    showSnackbar('Order cancelled successfully!', 'info');
  };

  const handleMenuOpen = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setOrderDetails({
      quantity: '',
      unit: product.unit,
      deliveryAddress: '',
      notes: ''
    });
    setOrderDialogOpen(true);
  };

  const handleOrderSubmit = () => {
    if (orderDetails.quantity && orderDetails.deliveryAddress) {
      const newOrder = {
        id: orders.length + 1,
        product: selectedProduct.product,
        quantity: Number(orderDetails.quantity),
        unit: orderDetails.unit,
        price: selectedProduct.price,
        status: 'Pending',
        supplier: 'Market Supplier',
        rating: 0,
        deliveryAddress: orderDetails.deliveryAddress,
        notes: orderDetails.notes,
        lastUpdated: new Date()
      };

      setOrders([...orders, newOrder]);
      setOrderDialogOpen(false);
      showSnackbar('Order placed successfully!', 'success');
    }
  };

  // Calculate total order value
  const totalValue = orders.reduce((sum, order) => sum + (order.quantity * order.price), 0);

  // Calculate order statistics
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
  const averageRating = orders.reduce((sum, order) => sum + order.rating, 0) / orders.length;

  return (
    <DashboardLayout title="Buyer Dashboard">
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Order Value
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
                Pending Orders
              </Typography>
              <Typography variant="h4" component="div" color="warning.main">
                {pendingOrders}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Orders awaiting delivery
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Average Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4" component="div" color="success.main">
                  {averageRating.toFixed(1)}
                </Typography>
                <Rating value={averageRating} readOnly precision={0.5} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Based on {orders.length} orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Management */}
        <Grid item xs={12}>
          <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Order Management</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                  sx={{ borderRadius: 2 }}
                >
                  New Order
                </Button>
              </Box>
              <Tabs 
                value={activeTab} 
                onChange={(e, newValue) => setActiveTab(newValue)}
                sx={{ mb: 2 }}
              >
                <Tab label="All Orders" />
                <Tab label="Pending" />
                <Tab label="Delivered" />
              </Tabs>
              <List>
                {orders
                  .filter(order => {
                    if (activeTab === 1) return order.status === 'Pending';
                    if (activeTab === 2) return order.status === 'Delivered';
                    return true;
                  })
                  .map((order) => (
                    <ListItem
                      key={order.id}
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
                            <Typography variant="subtitle1">{order.product}</Typography>
                            <Chip
                              size="small"
                              label={`$${order.price}/${order.unit}`}
                              color="primary"
                              variant="outlined"
                            />
                            <Chip
                              size="small"
                              label={order.status}
                              color={order.status === 'Delivered' ? 'success' : 'warning'}
                              icon={order.status === 'Delivered' ? <CheckCircleIcon /> : <PendingIcon />}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 24, height: 24, fontSize: '0.875rem' }}>
                                {order.supplier[0]}
                              </Avatar>
                              <Typography variant="body2">
                                {order.supplier}
                              </Typography>
                            </Box>
                            <Typography variant="body2">
                              {order.quantity} {order.unit} ordered
                            </Typography>
                            <Rating value={order.rating} readOnly size="small" />
                            <Typography variant="caption" color="text.secondary">
                              Last updated: {new Date(order.lastUpdated).toLocaleTimeString()}
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
                          onClick={(e) => handleMenuOpen(e, order)}
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
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocalShippingIcon color="action" fontSize="small" />
                          <Typography color="text.secondary">
                            {item.market}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                          Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<ShoppingCartIcon />}
                          fullWidth
                          sx={{ mt: 2, borderRadius: 2 }}
                          onClick={() => handleOrderClick(item)}
                        >
                          Order Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Order Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{ sx: { borderRadius: 2 } }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Place New Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={newOrder.product}
            onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            label="Unit"
            fullWidth
            value={newOrder.unit}
            onChange={(e) => setNewOrder({ ...newOrder, unit: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            margin="dense"
            label="Price per Unit"
            type="number"
            fullWidth
            value={newOrder.price}
            onChange={(e) => setNewOrder({ ...newOrder, price: e.target.value })}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button onClick={handleAddOrder} variant="contained" sx={{ borderRadius: 2 }}>
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Menu */}
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
          Edit Order
        </MenuItem>
        <MenuItem onClick={() => {
          handleDeleteOrder(selectedOrder?.id);
          handleMenuClose();
        }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Cancel Order
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <LocalShippingIcon fontSize="small" sx={{ mr: 1 }} />
          Track Delivery
        </MenuItem>
      </Menu>

      {/* Order Dialog */}
      <Dialog
        open={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: 2 } }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Place Order - {selectedProduct?.product}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Product Details
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Price:</Typography>
              <Typography color="primary.main" fontWeight="bold">
                ${selectedProduct?.price}/{selectedProduct?.unit}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Market:</Typography>
              <Typography>{selectedProduct?.market}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Order Details
            </Typography>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              value={orderDetails.quantity}
              onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Delivery Address"
              multiline
              rows={2}
              value={orderDetails.deliveryAddress}
              onChange={(e) => setOrderDetails({ ...orderDetails, deliveryAddress: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Additional Notes"
              multiline
              rows={2}
              value={orderDetails.notes}
              onChange={(e) => setOrderDetails({ ...orderDetails, notes: e.target.value })}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)} sx={{ borderRadius: 2 }}>
            Cancel
          </Button>
          <Button 
            onClick={handleOrderSubmit} 
            variant="contained" 
            sx={{ borderRadius: 2 }}
            disabled={!orderDetails.quantity || !orderDetails.deliveryAddress}
          >
            Place Order
          </Button>
        </DialogActions>
      </Dialog>

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

export default BuyerDashboard; 