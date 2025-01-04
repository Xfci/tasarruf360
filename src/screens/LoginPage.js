import { Text, View, Image, TextInput, TouchableOpacity, Pressable, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, onValue, get } from '../../config'
import { styles } from '../../style'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomModal from '../components/bottomModal';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from "expo-auth-session/providers/google"
import { sayac } from '../scripts/userInfoScript';
import { SvgUri } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActiveVisible, setModalActiveVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrors] = useState(""); // Hataları tutmak için state
  const [userInfo, setUserInfo] = useState(null);
  const [state, setState] = useState(false);

  WebBrowser.maybeCompleteAuthSession();

  //google ile giriş işlemi için id'lerin belirlenmesi 
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "623092650592-2l1s3ih6driujjpnus112r7t92gksd5t.apps.googleusercontent.com",
    androidClientId: "623092650592-jhd8cav0okov0gs662nf26at3adpauc8.apps.googleusercontent.com",
    iosClientId: "623092650592-ol6sf6n1q9j8p2agsvgcsto3sk27rs87.apps.googleusercontent.com",
    webClientId: "623092650592-jfjqka8t3t5sjm83ot0i28a96vg41cuk.apps.googleusercontent.com"
  });

  //google giriş işleminde bir cevap alırsa değişkene kullanıcı bilgilerini atar
  useEffect(() => {
    handleEffect();
  }, [response]);

  //eğer cevap var ise giriş yap ve maine git
  async function handleEffect() {
    const user = await getLocalUser();
    if (!user) {
      await getUserInfo(response.authentication.accessToken);
    } else {
      setUserInfo(user);
      navigation.replace("main", { user });
    }
  }

  //kullanıcı bilgilerini cihazın local depolamasına kaydet
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  }

  //kullanıcı bilgilerini al
  const getUserInfo = async (token) => {
    var control = true;
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      const dbref = ref(db, 'userInfo/');
      const snapshot = await get(dbref);
      snapshot.forEach(element => {
        if (user.id == element.key) {
          control = false;
        }
      });
      if (control) {
        await firebase.database().ref('userInfo/' + user.id).set({
          sayac
        });
      }
      setUserInfo(user);
      navigation.replace("main", { user });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const userData = await fetchUserData();
      if (userData) {
        console.log(userData);
        navigation.replace('main', { userData, tur: "eposta" });
      }
    };
    checkUser();
  }, []);

  const fetchUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@userData');
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  };

  //firebase üzerinden e-posta ile giriş işlemin
  async function signInWithEmail(email, password) {
    setLoading(true);
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      const userData = {
        email: user.user.email,
        id: user.user.uid,
      }
      setErrors(null);
      if (user.user.emailVerified != false) {
        const jsonValue = JSON.stringify(userData);
        await AsyncStorage.setItem("@userData", jsonValue);
        setState(true);
        navigation.replace('main', { userData, tur: "eposta" });
      } else {
        console.log("HATA EPOSTA ONAYLANMADI");
        setModalActiveVisible(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email)." ?
        signInWithName(email, password)
        :
        error == "FirebaseError: Firebase: A non-empty password must be provided (auth/missing-password)." ?
          setErrors('şifre veya email boş olamaz')
          :
          error == "FirebaseError: Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential)." ?
            setErrors("Hatalı gmail veya şifre girdiniz") : setErrors("Bilinmeyen bir hata meydana geldi")
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const kullanici = await fetchUser();
      if (kullanici) {
        console.log(kullanici);
        const user = kullanici;
        navigation.replace('main', { user, tur: "kullanici" });
      }
    };
    checkUser();
  }, []);

  const fetchUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@kullanici');
      if (jsonValue != null) {
        return JSON.parse(jsonValue);
      }
      return null;
    } catch (error) {
      console.error("Kullanıcı bilgileri alınamadı:", error);
    }
  };


  //firebase üzerinden kullanıcı adı ile giriş işlemi
  async function signInWithName(email, password) {
    const dbref = ref(db, 'users/');
    const dinle = onValue(dbref, (snapshot) => {
      snapshot.forEach(element => {
        const name = element.val().name;
        const pass = element.val().password;
        const user = name
        if (email == name && password == pass) {
          const jsonValue = JSON.stringify(name);
          AsyncStorage.setItem("@kullanici", jsonValue);
          setLoading(false);
          navigation.replace('main', { user, tur: "kullanici" });
        }
      });
    });
    setLoading(false);
    return () => dinle();
  }

  async function resetPassword(email) {
    setLoading(true);
    if (email != null) {
      try {
        await firebase.auth().sendPasswordResetEmail(email);
        setModalVisible(true)
      } catch (error) {
        setErrors("Geçerli bir mail adresi giriniz");
        console.log(error);
      }
    } else {
      console.log("bir değer gir");
      setErrors("Geçerli bir mail adresi giriniz");
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#b2e7f9' }]}>
      <View style={styles.loginContainer}>
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

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 5 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.bannerImage}>
              <SvgUri
                width="100%"
                height="100%"
                uri="https://www.btasoftware.com/images/banner1.svg"
              />

            </View>
          </TouchableWithoutFeedback>


          <View style={[styles.content, { borderTopLeftRadius: 30, borderTopRightRadius: 30 }]}>
            <Text style={styles.header}>Hoşgeldiniz 👋</Text>
            <View style={styles.inputWrapper}>
              <View>
                <View style={styles.inputContainer}>
                  <MaterialCommunityIcons name="email-outline" size={24} color="#B0B0B0" style={styles.icon} />
                  <TextInput
                    onChangeText={(value) => { setEmail(value) }}
                    style={styles.textInput}
                    placeholder="Email"
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  <View style={[styles.inputContainer, { marginBottom: 10 }]}>
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
                  <View style={[styles.alt, { justifyContent: 'space-between' }]}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    <TouchableOpacity style={styles.link} onPress={() => { resetPassword(email) }}>
                      <Text>Şifremi Unuttum</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {
                loading ?
                  <View style={styles.button}>
                    <ActivityIndicator color={'#fff'} />
                  </View>
                  :
                  <Pressable style={styles.button} onPress={() => { signInWithEmail(email, password) }}>
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                  </Pressable>
              }
            </View>
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

          <TouchableOpacity style={[styles.button, { backgroundColor: '#e4e7eb', flexDirection: 'row' }]} onPress={() => { promptAsync() }}>
            <Image source={require('../../assets/images/google.png')} style={{ height: 24, width: 24, marginRight: 15 }} />
            <Text style={[styles.buttonText, { color: '#697381', fontWeight: '500' }]}>Google ile devam et</Text>
          </TouchableOpacity>

          <View style={styles.alt}>
            <Text>Hesabın yok mu? </Text>
            <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.navigate('register')}>
              <Text style={styles.navigateLink}>Üye ol.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alt}>
            <Text>Hesabın yok mu? </Text>
            <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.navigate('deneme')}>
              <Text style={styles.navigateLink}>Üye ol.</Text>
            </TouchableOpacity>
          </View>
        </View>

        <StatusBar barStyle={'dark-content'} />
      </View>
    </SafeAreaView >
  )
}
export default LoginPage