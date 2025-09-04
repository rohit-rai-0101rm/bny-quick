// src/screens/HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

// Define the stack param types
type RootStackParamList = {
  Home: undefined;
  LargeListScreen: undefined;
  CartScreen: undefined;
  OfflineScreen: undefined;
  TokenScreen: undefined;
  DeepLinkScreen: undefined;
  CodeFixScreen: undefined;
  NativeModuleScreen: undefined;
};

// Define navigation type
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const features = [
  {
    id: "1",
    title: "Optimized Large List",
    screen: "optimizedlargelistscreen",
  },
  {
    id: "2",
    title: "Global State (Cart System)",
    screen: "productslistscreen",
  },
  { id: "3", title: "Offline Support", screen: "offlinesupportscreen" },
  { id: "4", title: "Secure Token Storage", screen: "tokenscreen" },
  { id: "5", title: "Deep Linking", screen: "userslistscreen" },
  { id: "6", title: "Code Review Fix", screen: "CodeFixScreen" },
  { id: "7", title: "Native Module", screen: "NativeModuleScreen" },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {features.map((feature) => (
        <TouchableOpacity
          key={feature.id}
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate(feature.screen as keyof RootStackParamList)
          }
        >
          <Text style={styles.cardText}>{feature.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "90%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    backgroundColor: "#4A90E2",
    marginVertical: 12,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 8,
    transform: [{ scale: 1 }],
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HomeScreen;
