import { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { api } from "@/lib/axios";

export default function PurchaseSuccess() {
  const { session_id } = useLocalSearchParams<{ session_id?: string }>();

  useEffect(() => {
    if (!session_id) return;

    (async () => {
      try {
        await api.post("/api/order/checkout-success", { sessionId: session_id });
        Alert.alert("Success ✅", "Payment successful!");
        router.replace("/cart"); // ili "/(tabs)" ili gde želiš
      } catch (e: any) {
        Alert.alert("Error", e?.response?.data?.message ?? "Failed to confirm order");
      }
    })();
  }, [session_id]);

  return (
    <View style={{ padding: 20 }}>
      <Text>Processing payment...</Text>
    </View>
  );
}