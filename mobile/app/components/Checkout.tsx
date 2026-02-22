import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import SafeScreen from "@/app/components/SafeScreen";
import { api } from "@/lib/axios";
import { useCart } from "@/hooks/useCart";

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { carts } = useCart();

  const fetchPaymentSheetParams = async () => {
    // šaljemo korpu da backend izračuna amount iz DB (sigurno)
    const products =
      carts?.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      })) ?? [];

    const { data } = await api.post("/api/payments/payment-sheet", { products });
    // očekuje: { paymentIntent, ephemeralKey, customer }
    return data;
  };

  const initializePaymentSheet = async () => {
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "CatCake Shop",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
      });

      if (error) {
        Alert.alert("Init error", error.message);
        return;
      }

      setLoading(true);
    } catch (e: any) {
      Alert.alert("Init failed", e?.message ?? "Unknown error");
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert("Payment failed", error.message);
      return;
    }
    Alert.alert("Success ✅", "Payment completed!");
    // ovde posle možeš: clearCart + navigate na success screen
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <SafeScreen>
      <View className="flex-1 px-4 pt-6">
        <Text className="text-white text-2xl font-bold">Checkout</Text>

        <TouchableOpacity
          disabled={!loading}
          onPress={openPaymentSheet}
          className={`mt-6 py-3 rounded-full ${
            loading ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Pay now" : "Loading..."}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
}