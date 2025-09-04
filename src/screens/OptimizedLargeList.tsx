import React, { useState, useEffect, memo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";

const ITEM_HEIGHT = 70;

// Modern list item
const ListItem = memo(
  ({ item, index }: { item: { title: string }; index: number }) => {
    const backgroundColor = index % 2 === 0 ? "#f9fafc" : "#ffffff";

    return (
      <View style={[styles.itemContainer, { backgroundColor }]}>
        {/* Optional small icon/avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{index + 1}</Text>
        </View>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    );
  }
);

const OptimizedLargeList: React.FC = () => {
  const [data, setData] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const json = await res.json();

        const repeatedData = Array.from({ length: 50 }).flatMap(() =>
          json.map((item: any) => ({
            id: `${item.id}-${Math.random().toString(36).substr(2, 5)}`,
            title: item.title,
          }))
        );

        setData(repeatedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => <ListItem item={item} index={index} />}
      keyExtractor={(item) => item.id}
      getItemLayout={getItemLayout}
      initialNumToRender={20}
      maxToRenderPerBatch={20}
      windowSize={10}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: ITEM_HEIGHT,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
    color: "#111",
    marginLeft: 15,
    flexShrink: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default OptimizedLargeList;
