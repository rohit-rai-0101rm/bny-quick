// src/screens/TokenScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({ id: "auth_storage" });
const STORAGE_KEY = "USER_TOKEN";

const TokenScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const generateToken = (): string =>
    "token_" + Math.random().toString(36).substr(2, 10);

  const storeToken = (): void => {
    const newToken = generateToken();
    storage.set(STORAGE_KEY, newToken);
    setToken(newToken);
  };

  const retrieveToken = (): void => {
    const savedToken = storage.getString(STORAGE_KEY);
    if (savedToken) {
      setToken(savedToken);
    } else {
      storeToken(); // store first token if none exists
    }
    setLoading(false);
  };

  useEffect(() => {
    retrieveToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Token Storage</Text>

      <View style={styles.card}>
        <Text style={styles.tokenLabel}>Current Token</Text>
        <Text style={styles.token}>{token}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={storeToken}>
        <Text style={styles.buttonText}>Save New Token</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={retrieveToken}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Retrieve Token
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 30,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 30,
    alignItems: "center",
  },
  tokenLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888",
    marginBottom: 10,
  },
  token: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4A90E2",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#4A90E2",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4A90E2",
  },
  secondaryButtonText: {
    color: "#4A90E2",
  },
});

export default TokenScreen;
