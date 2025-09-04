import React, { useEffect } from "react";
import { ActivityIndicator, View, SafeAreaView } from "react-native";
import AppNavigator from "./AppNavigator";
import { generateToken } from "./src/api/authApi";
import { setAuthToken } from "./src/api/apiClient";
import { useAsyncStorage } from "./src/hooks/useAsyncStorage";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

const App = () => {
  const {
    value: token,
    save: saveToken,
    loading: tokenLoading,
  } = useAsyncStorage<string | null>("USER_AUTH_TOKEN", null);

  useEffect(() => {
    const fetchAndSetToken = async () => {
      try {
        if (!token) {
          const newToken = await generateToken();
          await saveToken(newToken);
          setAuthToken(newToken);
        } else {
          setAuthToken(token);
        }
      } catch (error) {
        console.error("❌ Token setup failed:", error);
      }
    };

    if (!tokenLoading) {
      fetchAndSetToken();
    }
  }, [token, tokenLoading]);

  if (tokenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F7F7" }}>
        <AppNavigator />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
