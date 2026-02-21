import { View, Text, TouchableOpacity } from 'react-native'

import SafeScreen from './SafeScreen'
import { ScrollView } from 'react-native'

import { Image } from 'expo-image'
import { Product } from '@/type/ProductType'


import { useCart } from '@/hooks/useCart'

type ProductsListProps = {
  product: Product[];
};

const ProductsList = ({ product }: ProductsListProps)=> {

  const{addToCart}=useCart()



  return (
   <SafeScreen>
   <ScrollView className="flex-1" 
   contentContainerStyle={{paddingBottom:16}}
    showsVerticalScrollIndicator={false}
     >
    <View className="flex-row flex-wrap items-center justify-between px-4 py-2">
    
        {product.length > 0 ? (product.map((product)=>(
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
      <TouchableOpacity onPress={() => {addToCart(product._id)}} className="mt-2 bg-green-500 py-2 rounded-lg">
        <Text className="text-white text-center">Add to Cart</Text>
      </TouchableOpacity>
    </View>

        ))):(<Text className='text-white'> No products jet...</Text>)}
      </View>
        
      </ScrollView>
   </SafeScreen>
  )
}

export default ProductsList