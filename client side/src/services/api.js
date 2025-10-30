// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://expense-tracker-api.onrender.com/api'
});

// Request interceptor for API calls
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;