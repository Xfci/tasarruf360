import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase, db, ref, get, onValue } from '../../config'
import { SvgUri } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';


const AddPlace = () => {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [photo, setPhoto] = useState(null);
    const [floorName, setFloorName] = useState();

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
                    <TextInput style={styles.textInput} placeholder='Adres' />
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="map-marker-outline" size={30} color="darkred" />
                    </TouchableOpacity>
                </View>

                <Text>Kat Ekle</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='Kat 1' value={floorName} onChangeText={(value) => setFloorName(value)} />
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="layers-plus" size={30} color="darkred" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.content, { justifyContent: 'flex-end' }]}>

            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Devam</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        maxWidth: 600,
        alignSelf:'center',
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