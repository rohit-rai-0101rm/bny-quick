// src/api/apiClient.ts

import axios from 'axios';

/**
 * apiClient
 *
 * Configured axios instance used for making HTTP requests
 * throughout the app. All API calls should be made using
 * this client to ensure consistent headers and base URL.
 */
const apiClient = axios.create({
    baseURL: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * setAuthToken
 *
 * Dynamically sets the Authorization header on the axios instance.
 *
 * @param token - the auth token string to attach as a Bearer token
 */
export const setAuthToken = (token: string) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default apiClient;
