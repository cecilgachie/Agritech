import React, { createContext, useContext, useState, useEffect } from 'react';

const MarketContext = createContext();

export const useMarket = () => useContext(MarketContext);

export const MarketProvider = ({ children }) => {
  const [marketData, setMarketData] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'farmer',
    avatar: null,
    preferences: {
      notifications: {
        newOrders: true,
        priceUpdates: true,
        marketAlerts: true,
        deliveryUpdates: true
      },
      theme: 'light',
      language: 'en'
    }
  });
  const [communityPosts, setCommunityPosts] = useState([]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'You have received a new order for 50kg of tomatoes',
      read: false,
      timestamp: new Date()
    },
    {
      id: 2,
      type: 'price',
      title: 'Price Update',
      message: 'Tomato prices have increased by 10% in your area',
      read: false,
      timestamp: new Date()
    },
    {
      id: 3,
      type: 'market',
      title: 'Market Alert',
      message: 'New buyer interested in your products',
      read: false,
      timestamp: new Date()
    }
  ]);

  // Simulate real-time market data updates
  useEffect(() => {
    const fetchMarketData = async () => {
      // In a real app, this would be an API call
      const mockData = [
        { id: 1, product: 'Tomatoes', price: 2.50, unit: 'kg', market: 'Central Market', location: [51.505, -0.09], lastUpdated: new Date() },
        { id: 2, product: 'Potatoes', price: 1.80, unit: 'kg', market: 'Farmers Market', location: [51.51, -0.1], lastUpdated: new Date() },
        { id: 3, product: 'Carrots', price: 1.20, unit: 'kg', market: 'Local Market', location: [51.515, -0.095], lastUpdated: new Date() },
      ];
      setMarketData(mockData);
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Simulate community posts
  useEffect(() => {
    const fetchCommunityPosts = async () => {
      // In a real app, this would be an API call
      const mockPosts = [
        {
          id: 1,
          author: 'John Smith',
          content: 'Looking for organic tomatoes suppliers in the area.',
          timestamp: new Date(),
          likes: 5,
          comments: 2
        },
        {
          id: 2,
          author: 'Sarah Johnson',
          content: 'Just harvested fresh potatoes! Available for bulk purchase.',
          timestamp: new Date(),
          likes: 8,
          comments: 3
        }
      ];
      setCommunityPosts(mockPosts);
    };

    fetchCommunityPosts();
    const interval = setInterval(fetchCommunityPosts, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Notification handlers
  const markNotificationAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  // Profile handlers
  const updateProfile = (updates) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const updatePreferences = (preferenceUpdates) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferenceUpdates
      }
    }));
  };

  const updateNotificationPreferences = (notificationUpdates) => {
    setUserProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: {
          ...prev.preferences.notifications,
          ...notificationUpdates
        }
      }
    }));
  };

  const value = {
    marketData,
    setMarketData,
    userProfile,
    setUserProfile,
    communityPosts,
    setCommunityPosts,
    notifications,
    setNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    updateProfile,
    updatePreferences,
    updateNotificationPreferences
  };

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
}; 