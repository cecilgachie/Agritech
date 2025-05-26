import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Box,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const BuyerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data - In a real app, this would come from an API
  const availableProducts = [
    {
      id: 1,
      farmer: 'John Smith',
      product: 'Organic Tomatoes',
      quantity: 50,
      unit: 'kg',
      price: 2.80,
      distance: '5km',
      rating: 4.5
    },
    {
      id: 2,
      farmer: 'Sarah Johnson',
      product: 'Fresh Potatoes',
      quantity: 100,
      unit: 'kg',
      price: 1.90,
      distance: '8km',
      rating: 4.8
    },
    {
      id: 3,
      farmer: 'Mike Brown',
      product: 'Carrots',
      quantity: 75,
      unit: 'kg',
      price: 1.50,
      distance: '12km',
      rating: 4.2
    }
  ];

  const filteredProducts = availableProducts.filter(product =>
    product.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.farmer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Buyer Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Product Search */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search products or farmers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Available Products */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Products
              </Typography>
              <List>
                {filteredProducts.map((product) => (
                  <ListItem
                    key={product.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <LocalShippingIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">{product.product}</Typography>
                          <Chip
                            size="small"
                            label={`${product.rating} ★`}
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body2">
                            Farmer: {product.farmer}
                          </Typography>
                          <br />
                          <Typography component="span" variant="body2">
                            {product.quantity} {product.unit} available at ${product.price}/{product.unit}
                          </Typography>
                        </>
                      }
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        icon={<LocationOnIcon />}
                        label={product.distance}
                        variant="outlined"
                      />
                      <Button variant="contained" size="small">
                        Contact Farmer
                      </Button>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Connections */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Connections
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="John Smith"
                    secondary="Last contact: 2 days ago - Tomatoes"
                  />
                  <Button variant="outlined" size="small">
                    View History
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Sarah Johnson"
                    secondary="Last contact: 1 week ago - Potatoes"
                  />
                  <Button variant="outlined" size="small">
                    View History
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuyerDashboard; 