import axios from 'axios'

const API_URL = 'http://localhost:3030/';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const api = axios.create({
  baseURL: API_URL
});

export default api;