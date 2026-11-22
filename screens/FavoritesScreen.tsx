
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "../store/hooks";
import { selectFavoriteIds } from "../store/favoritesSlice";

import { BOOKS } from "../data/books";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export function FavoritesScreen() {
  // Lấy danh sách id sách yêu thích từ Redux
  const ids = useAppSelector(selectFavoriteIds);

  // Lọc thông tin sách từ mảng BOOKS
  const favorites = BOOKS.filter((book) =>
    ids.includes(book.id)
  );

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>♥ Sách yêu thích</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          padding: 14,
          flexGrow: 1,
        }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Bạn chưa có sách yêu thích.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.cover }}
              style={styles.cover}
              resizeMode="cover"
            />

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>
                {item.title}
              </Text>

              <Text style={styles.author}>
                {item.author}
              </Text>

              <Text style={styles.price}>
                {formatPrice(item.price)}
              </Text>

              <Text style={styles.rating}>
                ⭐ {item.rating.toFixed(1)} / 10
              </Text>
            </View>

            <Text style={styles.heart}>♥</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  header: {
    backgroundColor: colors.navy,
    padding: 14,
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  empty: {
    textAlign: "center",
    color: colors.muted,
    marginTop: 40,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 12,
  },

  cover: {
    width: 75,
    height: 105,
    borderRadius: 8,
    backgroundColor: colors.bg,
  },

  info: {
    flex: 1,
    gap: 5,
  },

  name: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.navy,
  },

  author: {
    color: colors.muted,
    fontSize: 13,
  },

  price: {
    color: colors.indigo,
    fontWeight: "800",
  },

  rating: {
    color: colors.muted,
    fontSize: 12,
  },

  heart: {
    color: colors.red,
    fontSize: 22,
  },
});
