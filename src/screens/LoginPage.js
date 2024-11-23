import { Text, View, Image, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { firebase, db, ref, onValue } from '../../config'
import { styles } from '../../style'
import BottomModal from '../components/bottomModal';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);


  //firebase üzerinden e-posta ile giriş işlemi
  async function signInWithEmail(email, password) {
    setLoading(true);
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userData = {
        email: user.user.email,
        id: user.user.uid,
        name: user.user.name
      }
      if (user.user.emailVerified != false) {
        navigation.replace('main', { userData });
      } else {
        console.log("HATA EPOSTA ONAYLANMADI");
        setModalVisible2(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)." ?
        signInWithName(email, password) : null
    }
  }

  //firebase üzerinden kullanıcı adı ile giriş işlemi
  async function signInWithName(email, password) {
    setLoading(true);
    const dbref = ref(db, 'users/');
    const dinle = onValue(dbref, (snapshot) => {
      snapshot.forEach(element => {
        const name = element.val().name;
        const pass = element.val().password;
        if (email == name && pass == password) {
          setLoading(false);
          navigation.navigate('main', { email, password });
        }
      });
    });
    setLoading(false);
    return () => dinle();
  }

  async function resetPassword(email) {
    if (email != null) {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        setModalVisible(true)
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("bir değer gir");
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

      <BottomModal
        description={"Eğer kayıtlı ise şifre sıfırlama bağlantısı e-mail adresinize gönderildi 📩"}
        image={require('../../assets/images/banner3.jpeg')}
        visibleState={modalVisible}
        onClose={() => setModalVisible(false)} // Modal'ı kapat
      />

      <Image
        style={styles.banner}
        source={require('../../assets/images/banner1.png')}
      />

      <View style={styles.formContainer}>
        <Text style={styles.header}>Hoşgeldiniz 👋</Text>
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' value={email} onChangeText={(value) => { setEmail(value) }} />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} value={password} onChangeText={(value) => { setPassword(value) }} />

        <TouchableOpacity style={styles.link} onPress={() => { resetPassword(email) }}>
          <Text>Şifremi Unuttum</Text>
        </TouchableOpacity>

        <Pressable style={[styles.button, { marginTop: 60 }]} onPress={() => { signInWithEmail(email, password) }}>
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

        <View style={styles.alt}>
          <Text>Hesabın yok mu? </Text>
          <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.navigate('register')}>
            <Text style={styles.navigateLink}>Üye ol.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default LoginPage