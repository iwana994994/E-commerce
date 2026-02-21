import {  Text } from 'react-native'
import React from 'react'
import SafeScreen from './SafeScreen'
import { ScrollView } from 'react-native'

const YourAddress = () => {
  return (
    <SafeScreen>
    <ScrollView>
      <Text>Address</Text>
    </ScrollView>
    </SafeScreen>
  )
}

export default YourAddress