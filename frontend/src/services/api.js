import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

const api = {
  register: async (userData) => {
    try {
      const response = await axiosInstance.post('/users/register', userData);
      console.log('API Register Response:', response.data);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('API Register Error:', error.response || error);
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  login: async (email, password) => {
    try {
      const response = await axiosInstance.post('/users/login', { email, password });
      console.log('API Login Response:', response.data);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('API Login Error:', error.response || error);
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getProfile: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) throw new Error('No user found');

      const response = await axiosInstance.get('/users/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Unable to connect to server. Please try again later.');
      }
      throw error;
    }
  },

  getItems: async () => {
    try {
      const response = await axiosInstance.get('/items');
      console.log('Items fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('API Get Items Error:', error);
      throw error;
    }
  },

  placeBid: async (itemId, amount) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axiosInstance.post(`/bids/${itemId}`, 
        { amount },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('API Place Bid Error:', error);
      throw error;
    }
  },

  getBids: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axiosInstance.get('/bids/my-bids', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('API Get Bids Error:', error);
      throw error;
    }
  },
};

export default api; 