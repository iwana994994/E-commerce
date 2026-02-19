import { View, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function SSOCallback() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(tabs)");
    }
  }, [isSignedIn]);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Signing you in...</Text>
    </View>
  );
}
