// src/screens/ProductsListScreen.tsx
import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/cartSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigation } from "@react-navigation/native";

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: "1", name: "Apple iPhone 15", price: 999 },
  { id: "2", name: "Samsung Galaxy S24", price: 899 },
  { id: "3", name: "Google Pixel 9", price: 799 },
  { id: "4", name: "OnePlus 12", price: 749 },
  { id: "5", name: "Sony WH-1000XM5 Headphones", price: 349 },
  { id: "6", name: 'Apple MacBook Pro 14"', price: 1999 },
  { id: "7", name: "Dell XPS 13 Laptop", price: 1299 },
  { id: "8", name: 'iPad Pro 12.9"', price: 1099 },
  { id: "9", name: "Amazon Kindle Paperwhite", price: 149 },
  { id: "10", name: "Apple Watch Series 9", price: 399 },
];

const ProductItem = React.memo(
  ({
    product,
    onToggle,
    added,
  }: {
    product: Product;
    onToggle: (p: Product) => void;
    added: boolean;
  }) => (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <Button
        title={added ? "Undo" : "Add"}
        color={added ? "#FF3B30" : "#4A90E2"}
        onPress={() => onToggle(product)}
      />
    </View>
  )
);

const ProductsListScreen: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const newAdded: { [key: string]: boolean } = {};
    cartItems.forEach((item) => {
      newAdded[item.id] = true;
    });
    setAddedItems(newAdded);
  }, [cartItems]);

  const handleToggleCart = useCallback(
    (product: Product) => {
      if (addedItems[product.id]) {
        dispatch(removeFromCart(product.id));
      } else {
        dispatch(addToCart(product));
      }
    },
    [dispatch, addedItems]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate("CartScreen" as never)}
        >
          <View style={{ width: 30, height: 30 }}>
            <Image
              source={{ uri: "https://via.placeholder.com/30?text=Cart" }}
              style={{ width: 30, height: 30 }}
            />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, cartItems.length]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onToggle={handleToggleCart}
          added={!!addedItems[item.id]}
        />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
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
  textContainer: { flexShrink: 1 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  price: { fontSize: 14, color: "#666" },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 18,
    alignItems: "center",
  },
  cartBadgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});

export default ProductsListScreen;
