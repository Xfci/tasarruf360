import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { firebase, db, ref, get } from '../../../config'
import { useNavigation } from '@react-navigation/native';
import { path } from '../myDevices';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Step2() {
    const [name, setName] = useState();
    const [adress, setAdress] = useState(null);
    const navigation = useNavigation();
    const [photo, setPhoto] = useState(null);
    const animation = useRef(null);

    const showAlert = () => {
        Alert.alert(
            "Fotoğrafınızı Seçin", // Başlık
            "Bir işlem seçin:", // Mesaj
            [
                {
                    text: "Fotoğraf çekmek", // 1. seçenek
                    onPress: () => pickImageWithPhoto()
                },
                {
                    text: "Galeriden seçmek", // 2. seçenek
                    onPress: () => pickImageWithGallery()
                }
            ],
            { cancelable: false } // İptal edilemez
        );
    };

    const pickImageWithPhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Kamera izni gerekiyor!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            ediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    const pickImageWithGallery = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert('Kamera izni gerekiyor!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
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
                    }
                } catch (error) {
                    console.log('OCR Hatası:', error);
                    Alert.alert('OCR hatası:', 'Detayları görmek için konsola bakın.');
                }
            };
            handleTextRecognition(photo);
        }
    }, [photo]);

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
                    navigation.navigate('main');
                })
            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Cihazınıza bir isim verin ve ekranda yazan MAC adresini girin.</Text>
            </View>

            <View style={styles.inputs}>
                <Text>Cihaz ismi</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='Cihazım' value={name} onChangeText={(value) => setName(value)} />
                </View>
                <Text>MAC adresi</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='00:00:00:00:00:00' value={adress} onChangeText={(value) => setAdress(value)} />
                    <TouchableOpacity onPress={() => { showAlert() }}>
                        <MaterialCommunityIcons name="camera-enhance-outline" size={30} color="#B0B0B0" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.content, { justifyContent: 'flex-end' }]}>
                
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
        padding: 20,
        maxWidth:1000,
        alignSelf:'center'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        maxWidth: 600,
        marginBottom: 10
    },
    textInput: {
        flex: 1, // Esneklik veriyoruz, TextInput geniş alanı kaplar
        fontSize: 16,
        paddingVertical: 15,
    },
    inputs: {
        flex: 2,
        gap: 10,
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