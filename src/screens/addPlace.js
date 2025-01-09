import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, StatusBar } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase, db, ref, get, onValue } from '../../config'
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";
import { fetchUserData } from '../scripts/fetchUserData';
import { createKey } from '../scripts/createKey';


const AddPlace = () => {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [photo, setPhoto] = useState(null);
    const [location, setLocation] = useState();
    const [id, setUID] = useState();

    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserData();
            setUID(data[0]);
        };
        getData();
    }, []);

    const showAlert = () => {
        Alert.alert(
            "Fotoğrafınızı Seçin",
            "Bir işlem seçin:",
            [
                {
                    text: "Fotoğraf çekmek",
                    onPress: () => pickImageWithPhoto()
                },
                {
                    text: "Galeriden seçmek",
                    onPress: () => pickImageWithGallery()
                }
            ],
            { cancelable: false }
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
            base64: true
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

    async function createPlace() {
        var createCode = createKey();
        var devam = true;
        if (name && location && name != 'joined') {
            const dbref = ref(db, 'places/');
            const snapshot = await get(dbref);
            snapshot.forEach(element => {
                element.forEach(element => {
                    const code = element.val().code;
                    const key = element.key;
                    if (name == key) {
                        console.log(name, key);
                        devam = false;
                    }
                    if (createCode == code) {
                        createCode = createKey();
                    }
                });
            });
            if (devam) {
                await firebase.database().ref(`places/${id}/${name}/`).set({
                    location: location,
                    code: createCode,
                    users: {
                        founder:{
                            0:id
                        },
                        admin: {
                            0: 'yok'
                        },
                        user: {
                            0: 'yok'
                        }
                    }
                });
                navigation.goBack();
            } else {
                console.log("Hata aynı isimde birden fazla yapı bulundu!");
                devam = true;
            }
        }
    }

    const selectLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Konum izni reddedildi.");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});

        let reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
            const place = reverseGeocode[0];
            const formattedName = `${place.formattedAddress}`;
            //const formattedName = `${place.region || "Şehir bilinmiyor"}/${place.subregion || "Bölge bilinmiyor"}/${place.district || "Mahalle bilinmiyor"}/${place.street || "Sokak bilinmiyor"}/${place.streetNumber}`;
            setLocation(formattedName);
        } else {
            alert("Konum bilgisi alınamadı.");
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.inputs}>
                <Text>Mekan ismi</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='Mekanım' value={name} onChangeText={(value) => setName(value)} />
                </View>
                <Text>Kapak Görseli</Text>
                <View style={styles.bigView}>
                    <View>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            source={{
                                uri: 'https://www.btasoftware.com/images/addImage.png',
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={() => showAlert()}>
                            <Text style={styles.buttonText}>Ekle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="delete-forever-outline" size={30} color="red" />
                        </TouchableOpacity>
                    </View>

                </View>
                <Text>Konum</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='Adres' value={location} onChangeText={(value) => setLocation(value)} />
                    <TouchableOpacity onPress={() => { selectLocation() }}>
                        <MaterialCommunityIcons name="map-marker-outline" size={30} color="darkred" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.content, { justifyContent: 'flex-end' }]}>

            </View>

            <TouchableOpacity style={styles.button} onPress={() => { createPlace() }}>
                <Text style={styles.buttonText}>Devam</Text>
            </TouchableOpacity>
            <StatusBar barStyle={'dark-content'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        maxWidth: 600,
        alignSelf: 'center',
        width: '100%',
        height: '100%',

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
    buttonAdd: {
        width: 100,
        height: 30,
        backgroundColor: '#0089ec',
        borderRadius: 35,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    bigView: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        maxWidth: 600,
        marginBottom: 10,
        padding: 20
    }
})

export default AddPlace