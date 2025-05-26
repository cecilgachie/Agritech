import React, { useState } from 'react';
import {
  Container,
  Typography,
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
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const FarmerDashboard = () => {
  const [inventory, setInventory] = useState([
    { id: 1, product: 'Tomatoes', quantity: 100, unit: 'kg', price: 2.50 },
    { id: 2, product: 'Potatoes', quantity: 200, unit: 'kg', price: 1.80 },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product: '',
    quantity: '',
    unit: 'kg',
    price: ''
  });

  const handleAddProduct = () => {
    if (newProduct.product && newProduct.quantity && newProduct.price) {
      setInventory([
        ...inventory,
        {
          id: inventory.length + 1,
          ...newProduct,
          quantity: Number(newProduct.quantity),
          price: Number(newProduct.price)
        }
      ]);
      setNewProduct({ product: '', quantity: '', unit: 'kg', price: '' });
      setOpenDialog(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Farmer Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Inventory Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Inventory Management</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenDialog(true)}
                >
                  Add Product
                </Button>
              </Box>
              <List>
                {inventory.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.product}
                      secondary={`${item.quantity} ${item.unit} - $${item.price}/${item.unit}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProduct(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Market Connections */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Market Connections
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Central Market"
                    secondary="Distance: 5km - Best price for tomatoes"
                  />
                  <Button variant="outlined" size="small">
                    Connect
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Farmers Market"
                    secondary="Distance: 8km - Looking for potatoes"
                  />
                  <Button variant="outlined" size="small">
                    Connect
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Add Product Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Name"
            fullWidth
            value={newProduct.product}
            onChange={(e) => setNewProduct({ ...newProduct, product: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Unit"
            fullWidth
            value={newProduct.unit}
            onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Price per Unit"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProduct} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FarmerDashboard; 