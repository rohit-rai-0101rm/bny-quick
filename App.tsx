import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './AppNavigator';

import { generateToken } from './src/api/authApi';
import { setAuthToken } from './src/api/apiClient';
import { useAsyncStorage } from './src/hooks/useAsyncStorage';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const App = () => {
  // Load or persist the auth token from AsyncStorage
  const {
    value: token,
    save: saveToken,
    loading: tokenLoading,
  } = useAsyncStorage<string | null>('USER_AUTH_TOKEN', null);

  useEffect(() => {
    /**
     * Handles token retrieval and setup.
     * - If no token exists, generate a new one via API.
     * - Save the new token into AsyncStorage.
     * - Always set the token into axios headers for API requests.
     */
    const fetchAndSetToken = async () => {
      try {
        if (!token) {
          // No token stored → generate a new one from API
          const newToken = await generateToken();
          await saveToken(newToken);
          setAuthToken(newToken);
        } else {
          // Token already exists → simply set it in axios headers
          setAuthToken(token);
        }
      } catch (error) {
        console.error('❌ Token setup failed:', error);
      }
    };

    // Only run once AsyncStorage is done loading
    if (!tokenLoading) {
      fetchAndSetToken();
    }
  }, [token, tokenLoading]);

  // Show loading indicator while reading token from AsyncStorage
  if (tokenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // AppNavigator holds all app screens once token logic is settled
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
