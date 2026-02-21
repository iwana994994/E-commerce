import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SafeScreen from '@/app/components/SafeScreen'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useUser } from '@clerk/clerk-expo'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { ScrollView } from 'react-native'

const Profile = () => {
  const{user} = useUser()
  return (
    <SafeScreen>
      <ScrollView>
      
      <View className='flex-1 mt-20 px-4 gap-2'>
        <View  className='rounded-2xl pb-5 bg-slate-600  flex-row gap-4 items-center justify-center px-4 pt-6'>
         
         <Image source={user?.imageUrl}
         style={{ width: 90, height: 90 , borderRadius: 50 }}

        />
        <View>
         <Text className='text-xl font-bold text-white'>{user?.firstName} {user?.lastName}</Text>
         <Text className='text-gray-400'>{user?.emailAddresses[0].emailAddress}</Text>
         </View>
        </View>

       <View className="mt-6 flex-row flex-wrap justify-between gap-2 ">

  <TouchableOpacity onPress={()=>router.push("/../components/EditProfile")}
   style={{ width: "48%" , height: "50%"}} className='rounded-2xl  bg-slate-600 items-center pt-6 mt-6' >
   <Ionicons name="create" size={24} color="white"  />
   <Text className='text-2xl font-bold text-white'>Edit Profile</Text>
    
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>router.push("/../components/YourOrder")}
    style={{ width: "48%", height: "50%" }} className='rounded-2xl  bg-slate-600 items-center pt-6 mt-6'>
    <Ionicons name="cart-outline" size={24} color="white"  />
    <Text className='text-2xl font-bold text-white'>Your Order</Text>
    
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>router.push("/../components/WishList")} 
  style={{ width: "48%", height: "50%" }} className='rounded-2xl  bg-slate-600 items-center pt-6 mt-6'>
    <Ionicons name="heart-outline" size={24} color="white"  />
    <Text className='text-2xl font-bold text-white'>WishList</Text>
    
  </TouchableOpacity>

  <TouchableOpacity onPress={()=>router.push("/../components/YourAddress")} 
  style={{ width: "48%" , height: "50%"}} className='rounded-2xl  bg-slate-600 items-center pt-6 mt-6'>
    <Ionicons name="location-outline" size={24} color="white"  />
    <Text className='text-2xl font-bold text-white'>Your Adress</Text>

  </TouchableOpacity>
</View>
      </View>
      </ScrollView>
    </SafeScreen>
  )
}

export default Profile