import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";

interface User {
  id: number;
  name: string;
  email: string;
}

const storage = new MMKV({ id: "users_storage" });
const STORAGE_KEY = "USERS_CACHE";

const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchUsers = useCallback(async () => {
    try {
      const netState = await NetInfo.fetch();

      if (netState.isConnected) {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data: User[] = await response.json();
        setUsers(data);
        storage.set(STORAGE_KEY, JSON.stringify(data));
      } else {
        const cachedData = storage.getString(STORAGE_KEY);
        if (cachedData) {
          setUsers(JSON.parse(cachedData));
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate(
          "userdetailsscreen" as never,
          { id: item.id } as never
        )
      }
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  email: { fontSize: 14, color: "#666" },
});

export default UserListScreen;
