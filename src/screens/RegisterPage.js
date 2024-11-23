import { Text, View, TextInput, Pressable, ActivityIndicator, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, onValue } from '../../config'
import { styles } from '../../style'

const RegisterPage = ({ navigation,route }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hesap aktivasyon maili e-posta adresinize gönderilmiştir. 📩 Lütfen hesabınızı aktif ediniz. </Text>
            <Pressable
              style={[styles.buttonModal, styles.buttonModalClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Devam Et</Text>
            </Pressable>
            <Image source={require('../../assets/images/email.jpeg')} style={styles.banner3} />
          </View>
        </View>
      </Modal>

      <View style={styles.formContainer}>
        <Text style={[styles.header, { textAlign: 'center', marginTop: 100 }]}>Üye Kayıt 🖐️</Text>
        <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' value={email} onChangeText={(value) => { setEmail(value) }} />
        <TextInput style={styles.input} placeholder='şifre' secureTextEntry={true} value={password} onChangeText={(value) => { setPassword(value) }} />
        <TextInput style={styles.input} placeholder='şifre onay' secureTextEntry={true} value={confirm} onChangeText={(value) => { setConfirm(value) }} />

        <Pressable style={[styles.button, { marginTop: 20 }]} onPress={() => { signUpWithEmail(email, password, confirm) }}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </Pressable>
        <View style={styles.alt}>
          <Text>Zaten hesabın var mı? </Text>
          <TouchableOpacity style={styles.navigateLink} onPress={() => navigation.goBack()}>
            <Text style={styles.navigateLink}>Giriş yap.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RegisterPage;