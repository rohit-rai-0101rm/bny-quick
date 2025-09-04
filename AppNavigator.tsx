import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CartScreen,
  HomeScreen,
  OfflineSupport,
  OptimizedLargeList,
  ProductListScreen,
  TokenScreen,
  UserDetailsScreen,
  UsersListScreen,
} from "./src/screens";

export type RootStackParamList = {
  homescreen: undefined;
  optimizedlargelistscreen: undefined;
  productslistscreen: undefined;
  offlinesupportscreen: undefined;
  cartscreen: undefined;
  tokenscreen: undefined;
  userslistscreen: undefined;
  userdetailsscreen: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      homescreen: "home",
      userdetailsscreen: "user/:id",
      optimizedlargelistscreen: "optimizedlargelist",
      productslistscreen: "productslist",
      offlinesupportscreen: "offline",
      cartscreen: "cart",
      tokenscreen: "token",
      userslistscreen: "userslist",
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="homescreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="homescreen" component={HomeScreen} />
        <Stack.Screen
          name="optimizedlargelistscreen"
          component={OptimizedLargeList}
        />
        <Stack.Screen name="productslistscreen" component={ProductListScreen} />
        <Stack.Screen name="offlinesupportscreen" component={OfflineSupport} />
        <Stack.Screen name="cartscreen" component={CartScreen} />
        <Stack.Screen name="tokenscreen" component={TokenScreen} />
        <Stack.Screen name="userslistscreen" component={UsersListScreen} />
        <Stack.Screen name="userdetailsscreen" component={UserDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
