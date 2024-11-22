import { StyleSheet, Text, View, Image, TextInput, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../config'
import { styles } from '../../style'

const RegisterPage = () => {
  const tema = useColorScheme();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);

  firebase.database().ref('users/').on('value', (snapshot) => {
    setId(id + 1);
    console.log("dinlenen veri:", snapshot,"\n yazılan veri:",id);
  });

  //firebase üzerinden e-posta ile kayıt işlemi
  async function signUpWithEmail(email, password) {
    setLoading(true);
    if (password == confirmation) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (error) {
        if (error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).") {
          //eğer email girilmedi ise kullanıcı adı ve şifre ile kayıt yapıcak
          signUpWithName(email, password);
        }
      } finally {
        console.log("giriş başarılı");
        setLoading(false);
      }
    } else {
      console.log("şifreler uyuşmuyor!");
    }
  }

  //kullanıcı adı ve şifre ile realtime database "users" başlığının altında kayıt yapıyor
  async function signUpWithName(email, password) {
    setLoading(true);
    try {
      await firebase.database().ref('users/' + id).set({
        name: email,
        password: password
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={require('../../assets/images/Designer.jpeg')} />
      <View style={styles.formContainer}>
        <Text style={[styles.header, tema.text]}>LoginPage</Text>
      </View>
    </View>
  )
}

export default RegisterPage;