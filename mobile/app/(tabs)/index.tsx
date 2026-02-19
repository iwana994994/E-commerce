
import React, { useState,useMemo } from 'react'
import SafeScreen from '@/components/SafeScreen'
import { ScrollView, View, Text, TouchableOpacity, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'react-native'
import ProductsList from '@/components/ProductsList'
import useProduct from '@/hooks/useProduct'

const ShopScreen = () => {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const Category=[{name:'All',icon:'grid-outline'}, {name:'Cat Birthday Cakes',image:require("../../assets/images/cake.png")}, {name:'Mini Paw Cupcakes',image:require("../../assets/images/cup2.png")}, {name:'Healthy Cat Treats',image:require("../../assets/images/health.png")}]
const{products}=useProduct()

 const filteredProducts = useMemo(() => {
  if (!products) return [];

  let filtered = products;

  // ✅ category filter
  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      (product) => product.category?.name === selectedCategory
    );
  }

  // ✅ search filter
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter((product) =>
      product.name?.toLowerCase().includes(q)
    );
  }

  return filtered;
}, [products, selectedCategory, search]);



  return (
    <SafeScreen>
      <ScrollView className="flex-1"
       contentContainerStyle={{ paddingBottom: 16 }} 
       showsVerticalScrollIndicator={false}>
        
      
      {/*HEDER */}
      <View className='pt-4' >
        <View className="flex-row items-center justify-between px-4 py-2">
          <View>
            <Text className="text-xl font-bold text-white">Shop</Text>
            <Text className="text-gray-500">Find your favorite products</Text>
          </View>
          <View>
            <TouchableOpacity className="p-2 bg-gray-700 rounded-full">
            <Ionicons name="options" size={24} color="white"  />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*SEARCH BAR */}
      <View className="px-4 py-2">
        <View className="flex-row items-center bg-gray-700 rounded-2xl px-4 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput className="ml-2"
           placeholderTextColor={"gray"}
            placeholder="Search products..."
              value={search}
            onChangeText={setSearch} />
        </View>
      </View>
      {/*CATEGORY COMPONENT */}
      <View className="px-4 py-2">
        <ScrollView horizontal
         showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16, }}>
          {Category.map((category) => (
            <TouchableOpacity key={category.name} 
            onPress={() => setSelectedCategory(category.name)} 
            className={` px-4 py-2 mr-2  ${selectedCategory === category.name ? 'bg-green-500' : 'bg-gray-700'} rounded-full`}>
         
              {category.image ? (<Image source={category.image} className="w-12 h-8 " />) : (<Ionicons name={category.icon as any} size={20} color="white"  />)}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/*PRODUCTS */}
        <ProductsList product={filteredProducts} />

      </View>
      </ScrollView>
    </SafeScreen>
  )
}

export default ShopScreen