// src/api/contentApi.ts

import { Content } from '../types/content';
import apiClient from './apiClient';

/**
 * getContent
 *
 * Fetches random content from the backend API.
 *
 * @returns Promise<Content> - The content object returned by the API
 */
export const getContent = async (): Promise<Content> => {
    try {
        // Make a GET request to fetch content
        const response = await apiClient.get<{ content: Content }>('/getContent');

        console.log('[ContentAPI] Content fetched successfully:', response.data.content);
        return response.data.content;
    } catch (error) {
        console.error('[ContentAPI] Failed to fetch content:', error);
        throw error;
    }
};
