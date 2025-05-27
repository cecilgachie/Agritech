import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMarket } from '../context/MarketContext';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';

const Home = () => {
  const navigate = useNavigate();
  const { marketData, communityPosts } = useMarket();

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Real-time Market Prices',
      description: 'Get up-to-date information about local market prices for your produce.'
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 40 }} />,
      title: 'Local Market Connections',
      description: 'Connect with nearby buyers and markets in your area.'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Community Network',
      description: 'Join a network of farmers and buyers to grow your business.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #4CAF50 30%, #FF9800 90%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF9800 30%, #4CAF50 90%)',
          }
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Connect Farmers with Markets
          </Typography>
          <Typography variant="h5" paragraph>
            Empowering small-scale farmers with market information and connections
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/register')}
            sx={{ mt: 2, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Real-time Market Data */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Latest Market Prices
        </Typography>
        <Grid container spacing={3}>
          {marketData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
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
                  <Typography variant="caption" color="text.secondary">
                    Last updated: {new Date(item.lastUpdated).toLocaleTimeString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Community Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Community Updates
        </Typography>
        <Grid container spacing={3}>
          {communityPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {post.author[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1">{post.author}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.timestamp).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography paragraph>{post.content}</Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <FavoriteIcon />
                      </IconButton>
                      <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                        {post.likes}
                      </Typography>
                      <IconButton size="small" sx={{ ml: 2, color: 'primary.main' }}>
                        <CommentIcon />
                      </IconButton>
                      <Typography component="span" variant="body2" sx={{ ml: 1 }}>
                        {post.comments}
                      </Typography>
                    </Box>
                    <IconButton size="small" sx={{ color: 'primary.main' }}>
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 