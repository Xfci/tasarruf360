import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState, useRef } from 'react'
import { useNavigation } from '@react-navigation/native';

const addPlace = () => {
    const navigation = useNavigation();
    const [name, setName] = useState();

    return (
        <View style={styles.container}>

            <View style={styles.inputs}>
                <Text>Mekan ismi</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='Mekanım' value={name} onChangeText={(value) => setName(value)} />
                </View>
                <Text>MAC adresi</Text>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder='' />
                    <TouchableOpacity onPress={() => { showAlert() }}>
                        <MaterialCommunityIcons name="camera-enhance-outline" size={30} color="#B0B0B0" />
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
        padding: 20
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

export default addPlace