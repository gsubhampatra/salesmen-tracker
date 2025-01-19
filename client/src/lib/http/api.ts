import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Replace 'authToken' with the key you're using for the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;