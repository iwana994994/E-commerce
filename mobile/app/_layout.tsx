import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import "../global.css"
import {useApi} from "../lib/axios"
import { StripeProvider } from '@stripe/stripe-react-native';
import { useEffect, useState } from "react";
export default function RootLayout() {


// mala komponenta koja samo aktivira interceptor
function ApiBootstrap() {
  useApi();
  return null;
}
  return (
<StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
       <ClerkProvider tokenCache={tokenCache}>
        <ApiBootstrap/>
  <Stack screenOptions={{ headerShown: false}}/>
  </ClerkProvider>
  </StripeProvider>
  )

}
