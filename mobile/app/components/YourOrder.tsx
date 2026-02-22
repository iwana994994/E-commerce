import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SafeScreen from "@/app/components/SafeScreen";
import useOrder from "../../hooks/useOrder";
import { useUser } from "@clerk/clerk-expo";
import { ScrollView } from "react-native";

export default function YourOrderScreen() {
  const { orders, fetchOrder, error } = useOrder();
  const { isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    fetchOrder();
  }, [isLoaded]);

  return (
    <SafeScreen>
      <ScrollView>
      <Text className="text-white text-xl font-bold">Your Orders</Text>

      {!!error && <Text className="text-red-400">Error: {error}</Text>}

      {orders.length ? (
        orders.map((o: any) => (
          <View key={o._id} className="mt-4 p-4 rounded-2xl bg-gray-800">
            <Text className="text-white">Order ID: {o._id}</Text>
            <Text className="text-gray-400">Items: {o.products?.length ?? 0}</Text>
            <Text className="text-gray-400">Total: {o.products?.reduce((acc: any, curr: any) => acc + curr.price, 0)}</Text>
            <Text className="text-gray-400">Date: {o.createdAt.split("T")[0]}</Text>
            <Text className="text-gray-400">Items: {o.products?.map((p: any) => p.product.name).join(",  ")}</Text>
          </View>
        ))
      ) : (
        <Text className="text-white mt-4">No orders yet.</Text>
      )}
      </ScrollView>
    </SafeScreen>
  );
}