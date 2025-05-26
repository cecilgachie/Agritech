import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment
} from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchIcon from '@mui/icons-material/Search';

// Sample data - In a real app, this would come from an API
const marketData = [
  { id: 1, product: 'Tomatoes', price: 2.50, unit: 'kg', market: 'Central Market', location: [51.505, -0.09] },
  { id: 2, product: 'Potatoes', price: 1.80, unit: 'kg', market: 'Farmers Market', location: [51.51, -0.1] },
  { id: 3, product: 'Carrots', price: 1.20, unit: 'kg', market: 'Local Market', location: [51.515, -0.095] },
];

const MarketPrices = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredData = marketData.filter(item =>
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.market.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Market Prices
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search products or markets..."
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
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Table View" />
          <Tab label="Map View" />
        </Tabs>
      </Box>

      {tabValue === 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Market</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>${row.price}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{row.market}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ height: 500, width: '100%' }}>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredData.map((market) => (
              <Marker key={market.id} position={market.location}>
                <Popup>
                  <Typography variant="subtitle1">{market.market}</Typography>
                  <Typography variant="body2">
                    {market.product}: ${market.price}/{market.unit}
                  </Typography>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      )}
    </Container>
  );
};

export default MarketPrices; 