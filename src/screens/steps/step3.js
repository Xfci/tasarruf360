import { StyleSheet, Text, View, TouchableOpacity,Platform,Linking } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function Step3() {
    const navigation = useNavigation();

    const goSettings = async () => {
        if (Platform.OS === 'android') {
            // Android cihazlarda Wi-Fi ayarlarına gitme
            await await Linking.sendIntent('android.settings.WIFI_SETTINGS');
          } else if (Platform.OS === 'ios') {
            // iOS cihazlarında Wi-Fi ayarlarına gitme
            await Linking.openURL('App-Prefs:root');
          }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <MaterialCommunityIcons name="wifi-sync" size={100} />
                <Text style={styles.text}>İnternete bağlanmak için önce cihaza bağlanmanız gerekir. Cihaz üzerindeki Wi-Fi adresine bağlanın ve devam edin.</Text>
            </View>

            <TouchableOpacity style={[styles.button,{backgroundColor:'blue',marginBottom:10}]} onPress={() => goSettings()}>
                <Text style={styles.buttonText}>Wi-Fi ayarlarını aç</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('webview')}>
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
    content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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