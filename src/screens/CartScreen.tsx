// src/screens/CartScreen.tsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { removeFromCart } from "../store/cartSlice";

const CartScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0),
    [cartItems]
  );

  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; price: number };
  }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Button
        title="Remove"
        color="#FF3B30"
        onPress={() => dispatch(removeFromCart(item.id))}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 😔</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>Total: ${totalPrice}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7", paddingHorizontal: 16 },
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  price: { fontSize: 14, color: "#666" },
  footer: {
    padding: 15,
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 10,
  },
  totalText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, color: "#666" },
});

export default CartScreen;
