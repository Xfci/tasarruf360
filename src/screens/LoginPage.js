import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import firebase from '../../config'

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  //firebase üzerinden e-posta ile giriş işlemi
  async function sigIn(email, password) {
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      console.log("giriş başarılı");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={require('../../assets/images/Designer.jpeg')} />
      <View style={styles.formContainer}>
        <Text style={styles.header}>LoginPage</Text>
      </View>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  formContainer: {
    padding: 10,
    height: '100%',
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '40%',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})