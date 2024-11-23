import { StyleSheet, Text, View, Image, TextInput, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, get, set, onValue } from '../../config'
import { styles } from '../../style'

//db.ref('users/' + 0).set({ name: 'deneme', password:"1234"});

const RegisterPage = () => {
  const tema = useColorScheme();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);

  //firebase üzerinden e-posta ile kayıt işlemi
  async function signUpWithEmail(email, password) {
    setLoading(true);
    if (password == confirmation) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (error) {
        if (error == "FirebaseError: Firebase: The email address is badly formatted. (auth/invalid-email).") {
          //eğer email girilmedi ise kullanıcı adı ve şifre ile kayıt yapıcak
          signUpWithName(email, password);
        }
      } finally {
        console.log("giriş başarılı");
        setLoading(false);
      }
    } else {
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
    } finally {
      setLoading(false);
    }
  }

  //kullanıcı id lerini veri tabanından çeker
  useEffect(() => {
    const dbref = ref(db, 'users/');
    const dinle = onValue(dbref, (snapshot) => {
      snapshot.forEach(element => {
        setId(parseInt(element.key) + 1);
      });
    });
    return () => dinle();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.banner} source={require('../../assets/images/Designer.jpeg')} />
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={() => { getir() }}>
          <Text style={[styles.header, tema.text]}>RegisterPage</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default RegisterPage;