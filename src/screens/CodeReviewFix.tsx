import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";

interface DataItem {
  id: string;
  title: string;
}

const data: DataItem[] = [
  { id: "1", title: "First item" },
  { id: "2", title: "Second item" },
  { id: "3", title: "Third item" },
];

const CodeFixScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Coorect FlatList Example</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  heading: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: { fontSize: 16 },
});

export default CodeFixScreen;
