import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SafeScreen from "@/app/components/SafeScreen";
import useOrder from "../../hooks/useOrder";
import { useUser } from "@clerk/clerk-expo";

export default function YourOrderScreen() {
  const { orders, fetchOrder, error } = useOrder();
  const { isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    fetchOrder();
  }, [isLoaded]);

  return (
    <SafeScreen>
      <Text className="text-white text-xl font-bold">Your Orders</Text>

      {!!error && <Text className="text-red-400">Error: {error}</Text>}

      {orders.length ? (
        orders.map((o: any) => (
          <View key={o._id} className="mt-4 p-4 rounded-2xl bg-gray-800">
            <Text className="text-white">Order ID: {o._id}</Text>
            <Text className="text-gray-400">Items: {o.products?.length ?? 0}</Text>
          </View>
        ))
      ) : (
        <Text className="text-white mt-4">No orders yet.</Text>
      )}
    </SafeScreen>
  );
}