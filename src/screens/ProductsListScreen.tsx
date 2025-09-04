import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
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

  const handleGoToCart = useCallback(() => {
    navigation.navigate("cartscreen" as never);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.cartBanner} onPress={handleGoToCart}>
          <Image
            source={{ uri: "https://via.placeholder.com/30?text=Cart" }}
            style={styles.cartImage}
          />
          <Text style={styles.cartText}>
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in Cart
          </Text>
          <Text style={styles.goToCartText}>View Cart</Text>
        </TouchableOpacity>

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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: "#F7F7F7" },
  innerContainer: { flex: 1, paddingHorizontal: 16 },
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
  textContainer: { flexShrink: 1 },
  name: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  price: { fontSize: 14, color: "#666" },
  cartBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 15,
    marginVertical: 15,
    borderRadius: 12,
    justifyContent: "space-between",
  },
  cartImage: { width: 30, height: 30 },
  cartText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  goToCartText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default ProductsListScreen;
