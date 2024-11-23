import { Text, View, Image, TextInput, TouchableOpacity, Pressable,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { firebase,db, ref, get, set, onValue } from '../../config'
import { styles } from '../../style'
import { SvgUri } from 'react-native-svg';



const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  //firebase üzerinden e-posta ile giriş işlemi
  async function signInWithEmail(email, password) {
    setLoading(true);
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userData = {
        email:user.user.email,
        id:user.user.uid,
        name:user.user.name
      }
      navigation.replace('main',{userData});
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)." ?
        signInWithName(email, password) : null
    }
  }

  async function signInWithName(email,password) {
    setLoading(true);
    const dbref = ref(db, 'users/');
    const dinle = onValue(dbref, (snapshot) => {
      snapshot.forEach(element => {
        const name = element.val().name;
        const pass = element.val().password;
        if (email == name && pass == password) {
          setLoading(false);
          navigation.navigate('main',{email,password});
        }
      });
    });
    setLoading(false);
    return () => dinle();
  }

  if (loading) {
    return(
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
        <TouchableOpacity style={styles.link}>
          <Text>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <Pressable style={styles.button} onPress={() => { signInWithEmail(email, password) }}>
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

        <Pressable style={[styles.button, { backgroundColor: '#e4e7eb', flexDirection: 'row', marginTop: 20 }]} onPress={() => {navigation.navigate('register')}}>
          <Text style={[styles.buttonText, { color: '#697381', fontWeight: '500' }]}>Kayıt Ol</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default LoginPage