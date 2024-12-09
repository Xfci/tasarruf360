import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, get } from '../../../config'
import { useNavigation } from '@react-navigation/native';
import { path } from '../myDevices';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {Entypo} from '@expo/vector-icons/';

export default function Step2() {
    const [name, setName] = useState();
    const [adress, setAdress] = useState(null);
    const navigation = useNavigation();
    const [photo, setPhoto] = useState(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Kamera izni gerekiyor!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    useEffect(() => {
        if (photo) {
            const handleTextRecognition = async (photo) => {
                try {
                    const result = await TextRecognition.recognize(photo.uri);
                    if (result.text.includes("mac:")) {
                        const macRegex = /mac:\s*(.*)/;
                        const match = result.text.match(macRegex);
                        setAdress(match[1]);
                        if (adress == null) {
                            console.log("işlem başarısız." , match);
                        }
                    }
                } catch (error) {
                    console.log('OCR Hatası:', error);
                    Alert.alert('OCR hatası:', 'Detayları görmek için konsola bakın.');
                }
            };
            handleTextRecognition(photo);
        }
    }, [photo])



    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // kullanıcının girdiği mac adresini veri tabanında bulunan esp cihazlarının mac adresiyle karşılaştırır ve kullanıcının cihazlarının bulunduğu klasöre ekler//
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function adressControl() {
        var devam = false;
        const dbref = ref(db, `${path}/myDevices/`);
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            const value = element.val();
            if (name == element.key || adress == value.mac) {
                devam = true;
            }
        });
        if (!devam) {
            createAdress();
        } else {
            setAdress("");
            setName("");
            console.log("Geçerli bir cihaz gir");
        }
    }

    async function createAdress() {
        const dbref = ref(db, 'espDevice/');
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            const key = element.key;
            if (adress == key && name) {
                firebase.database().ref(`${path}/myDevices/${name}`).set({
                    mac: key
                }).then(() => {
                    navigation.navigate('step3');
                })
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cihazınıza bir isim verin ve ekranda yazan MAC adresini girin.</Text>
            <View style={styles.inputs}>
                <Text>Cihaz ismi</Text>
                <TextInput style={styles.textInput} placeholder='Cihazım' value={name} onChangeText={(value) => setName(value)} />
                <Text>MAC adresi</Text>
                <TextInput style={styles.textInput} placeholder='00:00:00:00:00:00' value={adress} onChangeText={(value) => setAdress(value)} />
                <TouchableOpacity style = {{backgroundColor:'#f2bd11',flexDirection:'row',width: '99%',justifyContent:'space-around',alignItems:'center',borderRadius:35,height:50}} onPress={() => { pickImage() }}>
                    <Text style={styles.buttonText}>
                        Adresi kamera ile algıla
                    </Text>
                    <Entypo name="camera" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => adressControl()}>
                <Text style={styles.buttonText}>Devam</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1,
    },
    inputs: {
        flex: 2,
        gap: 10,
    },
    textInput: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#f2bd11',
        borderRadius: 35,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})