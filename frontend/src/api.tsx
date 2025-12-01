import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Laravel API URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Needed if you use Laravel Sanctum/auth
});

export default api;
