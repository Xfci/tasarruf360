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
      <View style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SvgUri
        width="100%"
        height="38%"
        uri="https://www.btasoftware.com/images/sekil-svg.svg"
      />
      <View style={styles.formContainer}>
        <Text style={styles.header}>Hoşgeldiniz 👋</Text>
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' value={email} onChangeText={(value) => { setEmail(value) }} />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} value={password} onChangeText={(value) => { setPassword(value) }} />
        <TextInput style={styles.input} placeholder='şifre onay' secureTextEntry={true} value={confirm} onChangeText={(value) => { setConfirm(value) }} />
        <Pressable style={[styles.button, { marginTop: 20 }]} onPress={() => { signUpWithEmail(email, password, confirm) }}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center' }}>YA DA</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>

        <Pressable style={[styles.button, { backgroundColor: '#e4e7eb', flexDirection: 'row' }]}>
          <Image source={require('../../assets/images/google.png')} style={{ height: 24, width: 24, marginRight: 15 }} />
          <Text style={[styles.buttonText, { color: '#697381', fontWeight: '500' }]}>Google ile devam et</Text>
        </Pressable>

        <Pressable style={[styles.button, { backgroundColor: '#e4e7eb', flexDirection: 'row', marginTop: 20 }]} onPress={() => {navigation.navigate('login')}}>
          <Text style={[styles.buttonText, { color: '#697381', fontWeight: '500' }]}>Giriş Yap</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RegisterPage;