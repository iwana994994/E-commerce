import {Text } from 'react-native'
import React from 'react'
import SafeScreen from './SafeScreen'
import { ScrollView } from 'react-native'

const EditProfile = () => {
  return (
   <SafeScreen>
    <ScrollView>
      <Text>EditProfile</Text>
    </ScrollView>
    </SafeScreen>
  )
}

export default EditProfile