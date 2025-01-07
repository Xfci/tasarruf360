import { StyleSheet, Text, View, TouchableOpacity,StatusBar } from 'react-native'
import React from 'react'
import { useRef, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


export default function Step1() {
    const navigation = useNavigation();
    const animation = useRef(null);

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <Text style={styles.text}>Cihazın üzerindeki ekrandaki adımları takip edin cihazının internet bağlantısını gerçekleştirin.</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('step2')}>
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
    button: {
        height: 50,
        backgroundColor: '#f2bd11',
        borderRadius: 35,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})