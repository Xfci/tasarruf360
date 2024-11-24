import { Text, View, TextInput, Pressable, ActivityIndicator, TouchableOpacity, Modal, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, onValue } from '../../config'
import { styles } from '../../style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomModal from '../components/bottomModal';


const RegisterPage = ({ navigation, route }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);


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
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        setLoading(false);
        console.log(user.user);
        await user.user.sendEmailVerification().then(() => {
          console.log("email doğrulaması gönderildi!");
          setModalVisible(true);
        });
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
      navigation.navigate('login');
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
      <BottomModal
        description={"Hesap aktivasyon maili e-posta adresinize gönderilmiştir 📥. Lütfen hesabınızı aktif ediniz."}
        image={require('../../assets/images/banner4.jpeg')}
        visibleState={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <Text style={[styles.header, { textAlign: 'center', marginTop: 100 }]}>Üye Kayıt 🖐️</Text>
      <KeyboardAvoidingView
        style={[styles.content]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


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

          <View style={styles.inputContainer}>
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

          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="lock-outline" size={24} color="#B0B0B0" style={styles.icon} />
            <TextInput
              onChangeText={(value) => { setConfirm(value) }}
              style={styles.textInput}
              placeholder="Şifre tekrar"
              secureTextEntry={!passwordConfirmVisible} // Şifre görünürlüğü
            />
            <TouchableOpacity
              onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)} // Şifre görünürlüğünü değiştir
            >
              <MaterialCommunityIcons
                name={passwordConfirmVisible ? 'eye' : 'eye-off'} // Duruma göre ikon
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          <Pressable style={[styles.buttonOutline, { marginTop: 20 }]} onPress={() => { signUpWithEmail(email, password, confirm) }}>
            <Text style={[styles.buttonText, { color: '#dead10' }]}>Kayıt Ol</Text>
          </Pressable>
        </View>
        <View style={[styles.alt, { marginBottom: 20 }]}>
          <Text>Zaten hesabın var mı? </Text>
          <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.goBack()}>
            <Text style={styles.navigateLink}>Giriş yap.</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.bannerImage, { marginTop: 20 }]}>
          <Image
            style={[styles.banner, { bottom: 50 }]}
            source={require('../../assets/images/banner2.jpg')}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default RegisterPage;