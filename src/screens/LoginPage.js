import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const LoginPage = () => {
  return (
    <View>
      <Image style={styles.banner} src=''/>
      <Text>LoginPage</Text>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  banner:{
    width: 100,
    height: 40,
  }
})