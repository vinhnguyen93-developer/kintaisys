import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from '../constants';

// Create an instance of Axios with custom configuration
const api = axios.create({
  baseURL: NEXT_PUBLIC_API_URL, // Set your API base URL in environment variables
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
    // You can add any other headers here
  },
});

export default api;
