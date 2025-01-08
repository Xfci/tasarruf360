import { Text, View, TextInput, Pressable, ActivityIndicator, TouchableOpacity, Modal, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, onValue, get } from '../../config'
import { styles } from '../../style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomModal from '../components/bottomModal';
import { sayac } from '../scripts/userInfoScript';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgUri } from 'react-native-svg';

const RegisterPage = ({ navigation, route }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [errorMessage, setErrors] = useState(""); // Hataları tutmak için state
  const [nickname, setNickname] = useState();
  const [key, setKey] = useState();

  //kullanıcıların en son ki id'sini veri tabanından çeker ve 1 ekler
  useEffect(() => {
    function createKey() {
      return Math.random().toString(36).substring(2, 25).toUpperCase();
    }

    var key = createKey();
    const dbref = ref(db, 'users/');
    const dinle = onValue(dbref, (snapshot) => {
      snapshot.forEach(element => {
        const controlKey = element.key;
        if (key != controlKey) {
          setKey(key);
        }
      });
    });
    return () => dinle();
  }, []);

  //firebase üzerinden e-posta ile kayıt işlemi
  async function signUpWithEmail(email, password, confirm, nickname) {
    var control = true;
    setLoading(true);
    const dbrefUsers = ref(db, 'users/');
    const snapshotUsers = await get(dbrefUsers);
    snapshotUsers.forEach(element => {
      element.forEach(element => {
        const key = element.key;
        const value = element.val();
        if (key == 'nickname') {
          if (nickname == value)
            control = false;
        }
      });
    });
    if (password == confirm && nickname && control) {
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        setErrors(null);
        setLoading(false);
        await firebase.database().ref('userInfo/' + user.user.uid).set({
          sayac
        });
        await firebase.database().ref('users/' + user.user.uid).set({
          name: email,
          password: password,
          nickname: nickname
        });
        await user.user.sendEmailVerification().then(() => {
          console.log("email doğrulaması gönderildi!");
          setModalVisible(true);
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
        error == "[FirebaseError: Firebase: Error (auth/invalid-email).]" ?
          setErrors("Geçerli bir mail adresi kullanın.") : null
        //eğer email girilmedi ise kullanıcı adı ve şifre ile kayıt gönderildi

        error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)." ?
          signUpWithName(email, password, nickname) : null

        //şifre 6 karakter olmalı
        error == "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password)." ?
          setErrors("Güçlü şifre kullanın.") : null

        error == "FirebaseError: Firebase: The email address is already in use by another account. (auth/email-already-in-use)." ?
          setErrors("Bu hesap zaten kullanılıyor. Giriş yapınız.") : null
        //   aynı hesap zaten var
      }
    } else if (password != confirm) {
      setLoading(false);
      setErrors("Şifreler uyuşmuyor.");
    } else if (!nickname && !email && !password) {
      setLoading(false);
      setErrors("Bütün alanları doldurmanız gerekmektedir.");
    } else if (!control) {
      setLoading(false);
      setErrors("Aynı takma isimden 2 tane oluşturulamaz.");
    }
  }

  //kullanıcı adı ve şifre ile realtime database "users" başlığının altında kayıt yapıyor
  async function signUpWithName(email, password, nickname) {
    var control = true;
    setLoading(true);
    try {
      const dbref = ref(db, 'userInfo/');
      const snapshot = await get(dbref);
      snapshot.forEach(element => {
        if (email == element.key) {
          control = false;
        }
      });
      const dbrefUsers = ref(db, 'users/');
      const snapshotUsers = await get(dbrefUsers);
      snapshotUsers.forEach(element => {
        element.forEach(element => {
          const key = element.key;
          const value = element.val();
          if (key == 'name') {
            if (email == value)
              control = false;
          } else if (key == 'nickname') {
            if (nickname == value)
              control = false;
          }
        });
      });
      if (control) {
        await firebase.database().ref('users/' + key).set({
          name: email,
          password: password,
          nickname: nickname
        });
        await firebase.database().ref('userInfo/' + key).set({
          sayac
        });
        setLoading(false);
        navigation.navigate('login');
      } else {
        setLoading(false);
        setErrors("Aynı kullanıcı adı veya takma isimden 2 tane oluşturulamaz");
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#ffd02c' }]}>
      <View style={styles.loginContainer}>

        <BottomModal
          description={"Hesap aktivasyon maili e-posta adresinize gönderilmiştir 📥. Lütfen hesabınızı aktif ediniz."}
          image={require('../../assets/images/banner4.jpeg')}
          visibleState={modalVisible}
          functionModal={true}
          onClose={() => { setModalVisible(false), navigation.navigate('login'); }}
        />
        <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center' }}>
          <Text style={[styles.header, { textAlign: 'center' }]}>Üye Kayıt 🖐️</Text>
        </View>

        <View
          style={[styles.content, { borderBottomRightRadius: 30, borderBottomLeftRadius: 30, paddingBottom: 25 }]}>
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
              <MaterialCommunityIcons name="email-outline" size={24} color="#B0B0B0" style={styles.icon} />
              <TextInput
                onChangeText={(value) => { setNickname(value) }}
                style={styles.textInput}
                placeholder="Takma Ad"
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
            <Text style={styles.errorText}>{errorMessage}</Text>

            {
              loading ?
                <View style={[styles.buttonOutline, { color: '#dead10' }]}>
                  <ActivityIndicator color={'#fff'} />
                </View>
                :
                <Pressable style={[styles.buttonOutline, { marginTop: 20 }]} onPress={() => { signUpWithEmail(email, password, confirm, nickname) }}>
                  <Text style={[styles.buttonText, { color: '#dead10' }]}>Kayıt Ol</Text>
                </Pressable>
            }
            <View style={[styles.alt]}>
              <Text>Zaten hesabın var mı? </Text>
              <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.goBack()}>
                <Text style={styles.navigateLink}>Giriş yap.</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.bannerImage]}>
            <SvgUri
              width="100%"
              height="100%"
              uri="https://www.btasoftware.com/images/banner2.svg"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <StatusBar barStyle={'dark-content'} />
    </SafeAreaView>
  )
}

export default RegisterPage;