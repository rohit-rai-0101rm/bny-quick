// src/navigation/AppNavigator.js

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
} from "./src/screens";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="homescreen"
        screenOptions={{ headerShown: false }}
      >
        {/* Main content list screen */}
        <Stack.Screen name="homescreen" component={HomeScreen} />

        {/* Content details screen, shown on item tap */}
        <Stack.Screen
          name="optimizedlargelistscreen"
          component={OptimizedLargeList}
        />

        <Stack.Screen name="productslistscreen" component={ProductListScreen} />

        <Stack.Screen name="offlinesupportscreen" component={OfflineSupport} />

        <Stack.Screen name="cartscreen" component={CartScreen} />

        <Stack.Screen name="tokenscreen" component={TokenScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
