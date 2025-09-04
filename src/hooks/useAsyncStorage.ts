// src/hooks/useAsyncStorage.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * useAsyncStorage
 *
 * A reusable hook for interacting with React Native AsyncStorage.
 * It provides reactive get, set, and remove methods for a specific key.
 *
 * @param key - The key to use in AsyncStorage
 * @param initialValue - Default value if nothing is found
 *
 * @returns {
 *   value: current stored value,
 *   save: function to update the value,
 *   remove: function to delete the value,
 *   loading: true if value is being loaded
 * }
 */
export const useAsyncStorage = <T>(key: string, initialValue: T) => {
    // State to store the value associated with the key
    const [storedValue, setStoredValue] = useState<T>(initialValue);

    // Indicates whether value is being loaded
    const [loading, setLoading] = useState(true);

    // On mount, load the value from AsyncStorage
    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(key);
                if (raw !== null) {
                    setStoredValue(JSON.parse(raw)); // Parse and set if found
                }
            } catch (e) {
                console.error(`❌ Failed to load ${key} from AsyncStorage`, e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [key]);

    /**
     * Saves a value to AsyncStorage and updates state
     */
    const save = async (value: T) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            setStoredValue(value);
        } catch (e) {
            console.error(`❌ Failed to save ${key}`, e);
        }
    };

    /**
     * Removes the stored value and resets to initial
     */
    const remove = async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (e) {
            console.error(`❌ Failed to remove ${key}`, e);
        }
    };

    return {
        value: storedValue,
        save,
        remove,
        loading,
    };
};
