import { Redirect, Tabs } from "expo-router";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useAuth } from "@clerk/clerk-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();
  const insets = useSafeAreaInsets();
  if (!isSignedIn) return <Redirect href="/(auth)" />;

  
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarActiveTintColor: "#10b10e",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          height: 32 + insets.bottom,
          paddingTop: 4,
          marginHorizontal: 80,
          marginBottom: insets.bottom,
          borderRadius: 24,
          overflow: "hidden",
        
      },
       tabBarBackground: () => (
          <BlurView
            intensity={80}
            tint="dark"
            style={StyleSheet.absoluteFill}

            
          />
        ),
      
     }}>
      <Tabs.Screen name="index" options={{ title: "Shop",
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="grid" color={color} size={size} />
        ),
       }} />


       <Tabs.Screen name="cart" options={{ title: "Cart",
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="cart" color={color} size={size} />
        ),
       }} />
       <Tabs.Screen name="profile" options={{ title: "Profile",
        tabBarIcon: ({ color, size }) => (
          <IonIcon name="person" color={color} size={size} />
        ),
       }} />
    </Tabs>
  );
}
