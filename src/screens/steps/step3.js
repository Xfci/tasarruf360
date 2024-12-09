import { StyleSheet, Text, View, TouchableOpacity, Platform, Linking } from 'react-native'
import React from 'react'
import { useRef } from 'react';
import LottieView from 'lottie-react-native';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function Step3() {
    const navigation = useNavigation();
    const animation = useRef(null);


    const goSettings = async () => {
        if (Platform.OS === 'android') {
            // Android cihazlarda Wi-Fi ayarlarına gitme
            await Linking.sendIntent('android.settings.WIFI_SETTINGS');
        } else if (Platform.OS === 'ios') {
            // iOS cihazlarında Wi-Fi ayarlarına gitme
            await Linking.openURL('App-Prefs:root');
        }
    };

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
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../../assets/images/wifi.json')}
                />
                <Text style={styles.text}>İnternete bağlanmak için önce cihaza bağlanmanız gerekir. Cihaz üzerindeki Wi-Fi adresine bağlanın ve devam edin. Bağlantı tamamlandıktan sonra adımları bitirin.</Text>
                <TouchableOpacity onPress={goSettings} >
                    <Text style={styles.link}>Ayarlara Git.</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonWifi} onPress={() => navigation.navigate('webview')}>
                <MaterialCommunityIcons name="wifi" size={24} color="#fff" style={{ marginRight: 10 }} />
                <Text style={styles.buttonText}>Bağlantı Paneli</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('main')}>
                <Text style={styles.buttonText}>Bitti</Text>
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
    link: {
        color: '#0000EE',
        margin: 40
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#f2bd11',
        borderRadius: 35,
        justifyContent: 'center',
    },
    buttonWifi: {
        width: '100%',
        height: 50,
        backgroundColor: '#0089ec',
        borderRadius: 35,
        justifyContent: 'center',
        marginBottom: 20,
        flexDirection:'row',
        alignItems:'center'
        
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})