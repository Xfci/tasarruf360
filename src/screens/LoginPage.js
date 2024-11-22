import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import firebase from '../../config'
import { styles } from '../../style'
import Svg, { Path } from 'react-native-svg';


const LoginPage = ({ navigation }) => {
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
      <Svg
        viewBox="0 0 1080 875"
        style={styles.svg}
      >
        <Path
          d="M0 860c0 0 139.9 60.2 558.6-98 0 0 317.8-146 521.4-131V0H0z"
          fill="#870000"
        />
        <Image
           href={require('../../assets/images/google.png')}
        />
      </Svg>
      <View style={styles.formContainer}>
        <Text style={styles.header}>Hoşgeldiniz 👋</Text>
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} />
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('register')}>
          <Text>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
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

      </View>
    </View>
  )
}

export default LoginPage