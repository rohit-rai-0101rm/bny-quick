// src/api/authService.ts

import axios from 'axios';

const AUTH_URL = 'https://swsut62sse.execute-api.ap-south-1.amazonaws.com/prod';

/**
 * generateToken
 *
 * Calls the API to generate a new authentication token
 * for the app to use in subsequent requests.
 *
 * @returns Promise<string> - A valid token string
 */
export const generateToken = async (): Promise<string> => {
    try {
        // Perform the token generation request
        const response = await axios.post<{ token: string }>(
            `${AUTH_URL}/generateToken`,
            {
                email: 'tushar.saini@lobb.in',
            }
        );

        console.log('✅ Token generated successfully:', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error('❌ Error generating token:', error);
        throw error;
    }
};
