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
      await firebase.auth().signInWithEmailAndPassword(email, password);
      navigation.replace('main',{userCreden});
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
      <SvgUri style={styles.banner}
        width="100%"
        height="38%"
        uri="https://membaspot.com.tr/images/banner2.svg"
      />
      <View style={styles.formContainer}>
        <Text style={styles.header}>Hoşgeldiniz 👋</Text>
<<<<<<< Updated upstream
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' value={email} onChangeText={(value) => { setEmail(value) }} />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} value={password} onChangeText={(value) => { setPassword(value) }} />
        <TouchableOpacity style={styles.link}>
          <Text>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <Pressable style={styles.button} onPress={() => { signInWithEmail(email, password) }}>
=======
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} />
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('forgetpassword')}>
          <Text>Şifremi Unuttum</Text>
        </TouchableOpacity>
        <Pressable style={[styles.button, { marginTop: 50 }]}>
>>>>>>> Stashed changes
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#858585' }} />
          <View>
            <Text style={{ width: 50, textAlign: 'center', color: '#858585' }}>YA DA</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#858585' }} />
        </View>

        <Pressable style={[styles.button, { backgroundColor: '#e4e7eb', flexDirection: 'row' }]}>
          <Image source={require('../../assets/images/google.png')} style={{ height: 24, width: 24, marginRight: 15 }} />
          <Text style={[styles.buttonText, { color: '#697381', fontWeight: '500' }]}>Google ile devam et</Text>
        </Pressable>

<<<<<<< Updated upstream
        <Pressable style={[styles.button, { backgroundColor: '#e4e7eb', flexDirection: 'row', marginTop: 20 }]} onPress={() => {navigation.navigate('register')}}>
          <Text style={[styles.buttonText, { color: '#697381', fontWeight: '500' }]}>Kayıt Ol</Text>
        </Pressable>
=======
        <View style={styles.alt}>
          <Text>Hesabın yok mu? </Text>
          <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.navigate('register')}>
            <Text style={styles.navigateLink}>Üye ol.</Text>
          </TouchableOpacity>
        </View>
>>>>>>> Stashed changes
      </View>
    </View>
  )
}

export default LoginPage