import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const LoginPage = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={require('../../assets/images/Designer.jpeg')}/>
      <View style={styles.formContainer}>
        <Text style={styles.header}>LoginPage</Text>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width:'100%',
  },
  formContainer:{
    padding:10,
    height:'100%',
    width:'100%',
  },
  banner:{
    width: '100%',
    height: '40%',
  },
  header:{
    fontSize:20,
    fontWeight:'bold',
  }
})