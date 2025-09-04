// src/navigation/AppNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CartScreen,
  ContentDetails,
  Contentscreen,
  HomeScreen,
  OfflineSupport,
  OptimizedLargeList,
  ProductListScreen,
  TokenScreen,
  UserDetailsScreen,
} from "../screens";

type RootStackParamList = {
  HomeScreen: undefined;
  OptimizedLargeListScreen: undefined;
  ProductsListScreen: undefined;
  OfflineSupportScreen: undefined;
  CartScreen: undefined;
  TokenScreen: undefined;
  UserDetailsScreen: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      HomeScreen: "home",
      UserDetailsScreen: "user/:id",
      OptimizedLargeListScreen: "optimizedlargelist",
      ProductsListScreen: "productslist",
      OfflineSupportScreen: "offline",
      CartScreen: "cart",
      TokenScreen: "token",
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="OptimizedLargeListScreen"
          component={OptimizedLargeList}
        />
        <Stack.Screen name="ProductsListScreen" component={ProductListScreen} />
        <Stack.Screen name="OfflineSupportScreen" component={OfflineSupport} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="TokenScreen" component={TokenScreen} />
        <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
