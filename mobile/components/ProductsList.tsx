import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SafeScreen from './SafeScreen'
import { ScrollView } from 'react-native'
import useProduct from '@/hooks/useProduct'
import { Image } from 'expo-image'
import { Product } from '@/type/ProductType'


type ProductsListProps = {
  product: Product[];
};

const ProductsList = ({ product }: ProductsListProps)=> {
  const{getProducts,products}=useProduct()
useEffect(()=>{
  console.log("calling getProducts")
  getProducts()
 
},[])
  
  return (
   <SafeScreen>
   <ScrollView className="flex-1" 
   contentContainerStyle={{paddingBottom:16}}
    showsVerticalScrollIndicator={false}
     >
    <View className="flex-row flex-wrap items-center justify-between px-4 py-2">
    
        {products.length > 0 ? (products.map((product)=>(
           <View
      key={product._id}
       style={{width:"48%"}}
      className="mb-3 p-4 rounded-2xl bg-gray-800"
    >
      <Image
       source={{ uri: product.image }}
       style={{ width: "100%", height: 120, borderRadius: 12 }}
      contentFit="cover"
/>
      <Text className="text-white font-semibold">{product.name}</Text>
      <Text className="text-gray-400">{product.price}</Text>
    </View>

        ))):(<Text className='text-white'> No products jet...</Text>)}
      </View>
        
      </ScrollView>
   </SafeScreen>
  )
}

export default ProductsList