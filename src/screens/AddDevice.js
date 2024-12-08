import React, { Component, useState, useRef } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Step1 from './steps/step1'
import Step2 from './steps/step2'


const AddDevice = () => {
    const navigation = useNavigation();
    const animation = useRef(null);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cihaz eklemek için bu yönergeleri takip ediniz.</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('step1')}>
                <Text style={styles.buttonText}>Devam</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 3
    },
    description: {
        color: 'gray',
        fontSize: 10,
        textAlign: 'center',
        flex: 1
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

export default AddDevice