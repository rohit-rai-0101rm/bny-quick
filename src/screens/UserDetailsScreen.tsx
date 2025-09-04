// src/screens/UserDetailsScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

interface User {
  id: number;
  name: string;
  email: string;
}

type RouteParams = {
  UserDetailsScreen: { id: number };
};

const UserDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, "UserDetailsScreen">>();
  const { id } = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loader}>
        <Text>User not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.userId}>User ID: {user.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  email: { fontSize: 18, color: "#4A90E2", marginBottom: 4 },
  userId: { fontSize: 16, color: "#666" },
});

export default UserDetailsScreen;
