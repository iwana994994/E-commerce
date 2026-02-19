import useSocialAuth from "@/hooks/useSocialAuth";
import { View, Text, Image, TouchableOpacity } from "react-native";

const AuthScreen = () => {
   const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={require("../../assets/images/cat-shop.png")}
        className="size-72 mb-8"
        resizeMode="contain"
      />
      <TouchableOpacity
        onPress={() => handleSocialAuth("oauth_google")}
        disabled={loadingStrategy === "oauth_google"}
        className="flex-row items-center justify-center px-4 py-2 border border-gray-300 rounded-md"
      >
        <Text>Sign in with Google</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default AuthScreen