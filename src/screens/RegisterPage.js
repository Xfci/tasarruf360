import { StyleSheet, Text, View, Image, TextInput, useColorScheme, TouchableOpacity, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, get, set, onValue } from '../../config'
import { styles } from '../../style'
import { SvgUri } from 'react-native-svg';

const RegisterPage = ({ navigation }) => {
  const tema = useColorScheme();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);

  //kullanıcıların en son ki id'sini veri tabanından çeker ve 1 ekler
  useEffect(() => {
    const dbref = ref(db, 'users/');
    const dinle = onValue(dbref, (snapshot) => {
      snapshot.forEach(element => {
        setId(parseInt(element.key) + 1);
      });
    });
    return () => dinle();
  }, []);
  firebase.database().ref('users/').on('value', (snapshot) => {
    setId(id + 1);
    console.log("dinlenen veri:", snapshot, "\n yazılan veri:", id);
  });

  //firebase üzerinden e-posta ile kayıt işlemi
  async function signUpWithEmail(email, password, confirm) {
    setLoading(true);
    if (password == confirm) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        //eğer email girilmedi ise kullanıcı adı ve şifre ile kayıt yapıcak
        error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)." ?
          signUpWithName(email, password) : null

        //şifre 6 karakter olmalı
        error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)." ?
          console.log("şifre 6 karakter olmalı") : null
      }
    } else {
      setLoading(false);
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
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={[styles.header, { textAlign: 'center', marginTop: 100 }]}>Üye Kayıt 🖐️</Text>
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} />
        <TextInput style={styles.input} placeholder='şifre tekrar' secureTextEntry={true} />
      </View>
    </View>
  )
}

export default RegisterPage;