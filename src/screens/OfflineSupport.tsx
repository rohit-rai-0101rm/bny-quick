import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import NetInfo from "@react-native-community/netinfo";

interface User {
  id: string;
  name: string;
  email: string;
}

const storage = new MMKV({ id: "users_storage" });
const STORAGE_KEY = "USERS_CACHE";

const OfflineScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const netState = await NetInfo.fetch();
    setIsOffline(!netState.isConnected);

    try {
      if (netState.isConnected) {
        // Add a timeout to avoid hanging
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(
          "https://randomuser.me/api/?results=50&nat=us",
          { signal: controller.signal }
        );
        clearTimeout(timeout);

        const data = await response.json();

        const usersData: User[] = data.results.map((u: any) => ({
          id: u.login.uuid,
          name: `${u.name.first} ${u.name.last}`,
          email: u.email,
        }));

        setUsers(usersData);
        storage.set(STORAGE_KEY, JSON.stringify(usersData));
      } else {
        const cachedData = storage.getString(STORAGE_KEY);
        if (cachedData) {
          setUsers(JSON.parse(cachedData));
        } else {
          Alert.alert("Offline", "No cached data available.");
        }
      }
    } catch (error) {
      console.warn("Fetch failed, loading cache if available");
      const cachedData = storage.getString(STORAGE_KEY);
      if (cachedData) {
        setUsers(JSON.parse(cachedData));
      } else {
        Alert.alert("Error", "No data available offline.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F2F4F7" }}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={{ color: "#fff" }}>You are offline</Text>
        </View>
      )}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  offlineBanner: {
    backgroundColor: "#FF4D4D",
    padding: 8,
    alignItems: "center",
  },
  listContent: { padding: 16, paddingBottom: 30 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  name: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#1A1A1A" },
  email: { fontSize: 14, color: "#666" },
});

export default OfflineScreen;
