import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRef, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';


export default function Step1() {
    const navigation = useNavigation();
    const animation = useRef(null);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                        margin: 20
                    }}
                    source={require('../../../assets/images/step1.json')}
                />
                <Text style={styles.text}>Cihazın üzerindeki ekrandaki adımları takip edin cihazının internet bağlantısını gerçekleştirin.</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('step2')}>
                <Text style={styles.buttonText}>Devam</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    button: {
        width: '100%',
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