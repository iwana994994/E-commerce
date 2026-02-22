import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { api } from "@/lib/axios";
import { useCart } from "@/hooks/useCart";

export default function PurchaseSuccess() {
  const { session_id } = useLocalSearchParams<{ session_id?: string }>();
  const { fetchCart } = useCart();

  useEffect(() => {
    if (!session_id) return;

    (async () => {
      try {
        await api.post("/api/order/checkout-success", { sessionId: session_id });
        await fetchCart(); // ili clearCart ako imaš
        Alert.alert("Success ✅", "Payment completed!");
        router.replace("/cart"); // ili /profile /orders
      } catch (e: any) {
        Alert.alert("Error", e?.response?.data?.error || e.message);
      }
    })();
  }, [session_id]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Payment success ✅</Text>
    </View>
  );
}