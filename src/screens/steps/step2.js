import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function Step2() {
    const [name, setName] = useState();
    const [adress, setAdress] = useState();
    const navigation = useNavigation();
    function git() {
        if (name && adress) {
            navigation.navigate('step3');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cihazınıza bir isim verin ve ekranda yazan MAC adresini girin.</Text>
            <View style={styles.inputs}>
                <Text>Cihaz ismi</Text>
                <TextInput style={styles.textInput} placeholder='Cihazım' value={name} onChangeText={(value) => setName(value)} />
                <Text>MAC adresi</Text>
                <TextInput style={styles.textInput} placeholder='00:00:00:00:00:00' value={adress} onChangeText={(value) => setAdress(value)} />
            </View>
            <TouchableOpacity style={styles.button} onPress={() => git()}>
                <Text style={styles.buttonText}>Devam</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20
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