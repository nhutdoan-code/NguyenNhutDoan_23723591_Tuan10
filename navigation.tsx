
import React from "react";
import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";

import { useAppSelector } from "./store/hooks";
import { selectCartCount } from "./store/cartSlice";

import { colors } from "./theme";

export type RootStackParamList = {
  Tabs: undefined;
  Detail: { id: string };
};

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// BT10.7b + BT10.9c: Bottom Tab Navigator
function Tabs() {
  // Lấy tổng số lượng sách trong giỏ hàng từ Redux Store
  const count = useAppSelector(selectCartCount);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.indigo,
      }}
    >
      {/* Tab Sách */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Sách",
          tabBarIcon: () => <Text>📚</Text>,
        }}
      />

      {/* Tab Giỏ hàng */}
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
          tabBarIcon: () => <Text>🛒</Text>,
          // Ẩn badge khi giỏ hàng trống
          tabBarBadge: count > 0 ? count : undefined,
        }}
      />

      {/* Tab Yêu thích */}
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Yêu thích",
          tabBarIcon: () => <Text>♥</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

// BT10.7a: Native Stack Navigator
export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.navy,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={Tabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          title: "Chi tiết sách",
        }}
      />
    </Stack.Navigator>
  );
}
