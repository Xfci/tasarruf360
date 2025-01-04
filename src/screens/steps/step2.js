import { StyleSheet, Text, View, TouchableOpacity, Platform, Linking } from 'react-native'
import React from 'react'
import { useRef } from 'react';
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

    const openBrowser = () => {
        const url = 'http://192.168.4.1/';
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>İnternete bağlanmak için önce cihaza bağlanmanız gerekir. Cihaz üzerindeki Wi-Fi adresine bağlanın ve devam edin. Bağlantı tamamlandıktan sonra cihazınızı ekleyin.</Text>
                <TouchableOpacity onPress={goSettings} >
                    <Text style={styles.link}>Ayarlara Git.</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonWifi} onPress={openBrowser}>
                <MaterialCommunityIcons name="wifi" size={24} color="#fff" style={{ marginRight: 10 }} />
                <Text style={styles.buttonText}>Bağlantı Paneli</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('step3')}>
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
        alignSelf: 'center',
        width: '100%',
        maxWidth: 1000,
        height: 50,
        backgroundColor: '#0089ec',
        borderRadius: 35,
        justifyContent: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'

    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    }
})

