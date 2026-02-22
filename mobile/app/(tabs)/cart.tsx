import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import SafeScreen from '@/app/components/SafeScreen'
import { useCart } from '@/hooks/useCart'
import { Image } from 'expo-image'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Linking from "expo-linking";
import { router } from 'expo-router'
const Cart = () => {
  const { fetchCart, carts,removeFromCart,checkout } = useCart()




  useEffect(() => {
    fetchCart()
  }, [])

  const handleCheckout = async () => {
    try {
      const data = await checkout(); // očekujemo { url }

      if (!data?.url) {
        console.log("Checkout response:", data);
        alert("Nema Stripe URL. Proveri backend response.");
        return;
      }

      await Linking.openURL(data.url); // ✅ mobile-friendly
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
   <SafeScreen>
        <View className="flex-1 pt-4">
          <View className="px-4">
            <Text className="text-white text-2xl font-bold pb-6">Your Cart    🛒</Text>
          </View>
   <View className="px-4 py-2">
  {carts?.length ? (
    carts.map((item) => (
      <View
        key={item.product._id}
        className="flex-row items-center mb-4 bg-gray-800 p-3 rounded-2xl"
      >
        {/* IMAGE */}
        <Image
          source={{ uri: item.product.image }}
          style={{ width: 90, height: 90, borderRadius: 12 }}
          contentFit="cover"
        />

        {/* INFO */}
        <View className="ml-3 flex-1">
          <Text className="text-white font-semibold">{item.product.name}</Text>
          <Text className="text-gray-400">{item.product.price} €</Text>
          <Text className="text-gray-400">Quantity: {item.quantity}</Text>
          <Text className="text-gray-400">Total: {item.product.price * item.quantity} €</Text>
        </View>
        {/* DELETE */}
        <TouchableOpacity onPress={() => {removeFromCart(item.product._id)}}>
          <Ionicons name="trash" size={18} color="red" />
        </TouchableOpacity>
      </View>
    ))
  ) : (
    <Text className="text-white">Cart is empty</Text>
  )}
</View>


       {/* TOTAL */}
    <View className="mt-4 border-t border-gray-700 pt-4 ">
      <Text className="text-white text-lg font-semibold">Total</Text>
      <Text className="text-white text-lg font-bold">
        {carts?.reduce((total, item) => total + item.product.price * item.quantity, 0)} €
      </Text>
    </View>
    <View>
      <TouchableOpacity 
      onPress={()=>{router.push("../components/Checkout")}}
      className="bg-green-600 py-3 rounded-full mt-6">

        <Text className="text-white text-center font-semibold">Buy Now</Text>
      </TouchableOpacity>
    </View>
      </View>
  </SafeScreen>
  )
}

export default Cart