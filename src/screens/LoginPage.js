import { Text, View, Image, TextInput, TouchableOpacity, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { firebase, db, ref, onValue } from '../../config'
import { styles } from '../../style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomModal from '../components/bottomModal';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActiveVisible, setModalActiveVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);


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
        setModalActiveVisible(true);
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
        description={"Eğer kayıtlı ise şifre sıfırlama bağlantısı e-mail adresinize gönderildi 📥."}
        image={require('../../assets/images/banner3.jpeg')}
        visibleState={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <BottomModal
        description={"Hesabınız aktive edilmemiş ❌. Aktivasyon işlemini tamamlayıp tekrar deneyiniz."}
        image={require('../../assets/images/banner4.jpeg')}
        visibleState={modalActiveVisible}
        functionModal={true}
        onClose={() => setModalActiveVisible(false)}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.bannerImage}>
          <Image
            style={styles.banner}
            source={require('../../assets/images/banner1.jpg')}
          />
        </View>
      </TouchableWithoutFeedback>


      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Text style={styles.header}>Hoşgeldiniz 👋</Text>

            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#B0B0B0" style={styles.icon} />
                <TextInput
                  onChangeText={(value) => { setEmail(value) }}
                  style={styles.textInput}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>
              <View style={[styles.inputContainer, {marginBottom:0}]}>
                <MaterialCommunityIcons name="lock-outline" size={24} color="#B0B0B0" style={styles.icon} />
                <TextInput
                  onChangeText={(value) => { setPassword(value) }}
                  style={styles.textInput}
                  placeholder="Şifre"
                  secureTextEntry={!passwordVisible} // Şifre görünürlüğü
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)} // Şifre görünürlüğünü değiştir
                >
                  <MaterialCommunityIcons
                    name={passwordVisible ? 'eye' : 'eye-off'} // Duruma göre ikon
                    size={24}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.link} onPress={() => { resetPassword(email) }}>
                <Text>Şifremi Unuttum</Text>
              </TouchableOpacity>

              <Pressable style={styles.button} onPress={() => { signInWithEmail(email, password) }}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
              </Pressable>
            </View>
      </KeyboardAvoidingView>

      <View style={styles.contentBottom}>
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
    </View >
  )
}

export default LoginPage