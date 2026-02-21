import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SafeScreen from "@/app/components/SafeScreen";
import useOrder from "../../hooks/useOrder";
import { useUser } from "@clerk/clerk-expo";


export default function YourOrderScreen() {
  const { orders, fetchOrder } = useOrder();
 

  useEffect(() => {
    
  }, []);

  return (
    <SafeScreen>
      <Text className="text-white">Your Orders</Text>

      {orders?.length ? (
        orders?.map((o: any) => (
          <View key={o._id}>
            <Text className="text-white">{o._id}</Text>
          
            <Text className="text-white">{o.quantity}</Text>

           
          </View>
        ))
      ) : (
        <Text className="text-white">No orders yet.</Text>
      )}
    </SafeScreen>
  );
}