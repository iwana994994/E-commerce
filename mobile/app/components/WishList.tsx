import { Text } from 'react-native'
import React from 'react'
import SafeScreen from './SafeScreen'
import { ScrollView } from 'react-native'

const WishList = () => {
  return (
    <SafeScreen>
    <ScrollView>
      <Text>WishList</Text>
    </ScrollView>
    </SafeScreen>
  )
}

export default WishList