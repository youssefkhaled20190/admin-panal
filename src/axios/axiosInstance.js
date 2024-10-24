import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7121/api/', // Base URL for your API
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;