import axios from 'axios';

// Configure axios to use the Vite proxy and current origin for API requests.
const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Add this to ensure cookies are sent with requests
});

export default instance;
