// import axios from 'axios';

// const API = axios.create({
//     baseURL: 'http//localhost:3000/api',
//     withCredentials: true,
// });

// export default API;

import axios from 'axios';

const API = axios.create({
    baseURL: '/api', // This will be proxied to 'http://localhost:3000' in development
    withCredentials: true, // Ensures cookies (access & refresh tokens) are sent with requests
});

// Request Interceptor (Optional: Add auth headers if needed)
API.interceptors.request.use(
    (config) => {
        // You can modify headers here if needed
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Handles expired tokens)
API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If Access Token is expired (403), attempt refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await API.post('/refresh-token'); // Refresh the access token
                return API(originalRequest); // Retry the original request
            } catch (refreshError) {
                console.error('Refresh token expired. Please log in again.');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default API;
