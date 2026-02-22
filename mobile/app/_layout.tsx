import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import "../global.css"
import {useApi} from "../lib/axios"

export default function RootLayout() {

// mala komponenta koja samo aktivira interceptor
function ApiBootstrap() {
  useApi();
  return null;
}
  return (

       <ClerkProvider tokenCache={tokenCache}>
        <ApiBootstrap/>
  <Stack screenOptions={{ headerShown: false}}/>
  </ClerkProvider>
  )

}
