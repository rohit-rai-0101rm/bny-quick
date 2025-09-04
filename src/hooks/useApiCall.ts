// src/hooks/useApiCall.ts

import { useEffect, useState } from 'react';

/**
 * Type for options passed to the useApiCall hook.
 * - call: The API function to invoke
 * - params: Optional parameters to pass to the call
 * - immediate: Whether to automatically run the call on mount
 */
type UseApiCallOptions<P> = {
    call: (params?: P) => Promise<any>;
    params?: P;
    immediate?: boolean;
};

/**
 * useApiCall
 *
 * Custom hook to handle API calls with built-in:
 * - loading state
 * - error handling
 * - storing returned data
 * - refetch logic
 *
 * @returns object containing:
 * - data: The fetched data or null
 * - error: An error object or null
 * - loading: Boolean indicating loading state
 * - refetch: Function to manually re-trigger the API call
 */
export const useApiCall = <T = any, P = void>({
    call,
    params,
    immediate = true,
}: UseApiCallOptions<P>) => {
    // Holds fetched data
    const [data, setData] = useState<T | null>(null);

    // Holds any API error encountered
    const [error, setError] = useState<Error | null>(null);

    // Controls loading indicator visibility
    const [loading, setLoading] = useState<boolean>(immediate);

    /**
     * Executes the API call.
     * @param customParams - optional custom parameters for the call
     */
    const execute = async (customParams?: P) => {
        setLoading(true);
        try {
            const response = await call(customParams ?? params);
            console.log("response", response);
            setData(response);
            setError(null);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Automatically trigger the API call on mount if immediate=true
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, []);

    return { data, error, loading, refetch: execute };
};
