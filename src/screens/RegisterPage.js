import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../config'

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);

  //firebase üzerinden e-posta ile kayıt işlemi
  async function signUp(email, password) {
    setLoading(true);
    if (password == confirmation) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            setLoading(false);
        } catch (error) {
            if (error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).") {
              //eğer email girilmedi ise kullanıcı adı ve şifre ile kayıt yapıcak
            }
        } finally {
            console.log("giriş başarılı");
            setLoading(false);
        }
    }else{
        console.log("şifreler uyuşmuyor!");
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