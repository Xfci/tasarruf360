import { StyleSheet, Text, View, Image, ScrollView, Switch, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, AlertIOS } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'

export default function Device() {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [selected, setSelected] = React.useState("");
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const mekanlar = [
        { key: '1', value: 'Mekan 1', disabled: true },
        { key: '2', value: 'Oda 1' },
        { key: '3', value: 'Oda 2' },
        { key: '4', value: 'Mekan 2', disabled: true },
        { key: '5', value: 'Oda 1' },
        { key: '6', value: 'Oda 2' },
        { key: '7', value: 'Oda 3' },
    ]


    const createTwoButtonAlert = () =>
        Alert.alert('CİHAZA BAĞLANIN', 'Cihazın üzerindeki reset tuşunu basılı tutun ve ekranda MAC adresinin yazdığına emin olun.', [
            { text: 'RESETLEDİM', onPress: () => navigation.navigate('webview') },
            {
                text: 'iptal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive',
            },
        ]);

    const closeAlert = () =>
        Alert.alert('Emin Misin?', 'Cihazı sildikten sonra tekrar kullanmak için resetlemen gerekir.', [
            {
                text: 'iptal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive',
            },
            { text: 'Evet', onPress: () => deleteDevice() },
        ]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>

            <ScrollView>

                <View style={styles.header}>
                    <TouchableOpacity style={{ alignSelf: 'flex-start', marginLeft: 10 }} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="close" size={40} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/images/electrical-panel.png')} style={{ height: 120, width: 120 }} />
                    <Text style={styles.headerTitle}>Cihazın ismi</Text>
                    <Text style={styles.macTitle}>Mekan 1 - Cihaz Türü</Text>
                    <Text style={styles.macTitle}>00:00:00:00:00:00</Text>
                    <Text style={[styles.header2, { color: 'green', fontSize: '16' }]}>Aktif ●</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.contentBlock}>
                        <View style={styles.wrapper}>
                            <Text style={styles.text}>Güç</Text>
                            <Switch
                                trackColor={{ false: '#3e3e3e', true: '#f5dd4b' }}
                                thumbColor={isEnabled ? '#ffff' : '#fff'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.text}>Harcanılan</Text>
                            <Text>2020 kw</Text>
                        </View>
                        <View style={styles.wrapper}>
                            <Text style={styles.text}>İstenen</Text>
                            <View style={styles.textInput}>
                                <TextInput placeholder='1000' />
                                <Text>kw</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentBlock}>
                        <View style={[styles.wrapper, { justifyContent: 'center' }]}>
                            <Text style={[styles.text]}>Cihaz Ayarları </Text>
                            <MaterialCommunityIcons name="cog-outline" size={24} style={styles.icon} />
                        </View>

                        <View style={styles.wrapperAlt}>
                            <Text style={styles.text}>Bağlantı</Text>
                            <View style={styles.wrapperNone}>
                                <View style={{ flex: 1 }}>
                                    <Text>TurkTelekom_ZT79GF_2.4GHz </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={styles.button} onPress={createTwoButtonAlert}>
                                        <View style={styles.wrapperNone}>
                                            <Text style={styles.buttonText}>Değiştir</Text>
                                            <MaterialCommunityIcons name="wifi-sync" color={'#fff'} size={20} style={styles.icon} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.wrapperAlt}>
                            <Text style={styles.text}>İsim Değiştir</Text>
                            <View style={[styles.textInput, { marginTop: 5, width: '100%', paddingLeft: 20 }]}>
                                <TextInput placeholder='Cihazım' />
                            </View>
                        </View>
                        <View style={styles.wrapperAlt}>
                            <Text style={[styles.text, { marginBottom: 5 }]}>Mekan</Text>
                            <SelectList
                                setSelected={(val) => setSelected(val)}
                                data={mekanlar}
                                save="value"
                            />
                        </View>
                        <TouchableOpacity style={[styles.wrapper, { justifyContent: '' }]} onPress={() => closeAlert()}>
                            <MaterialCommunityIcons name="delete-outline" color={'#e60000'} size={24} style={styles.icon} />
                            <Text style={[styles.text, { color: '#e60000' }]}> Cihazı Kaldır</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        gap: 4,
        height: 350,
        backgroundColor: '#f2bd11',
        borderBottomLeftRadius: '40%',
        borderBottomRightRadius: '40%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600'
    },
    macTitle: {
        color: 'gray'
    },
    content: {
        padding: 10
    },
    contentBlock: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 25,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30,
        maxWidth: 600
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    wrapperAlt: {
        padding: 20
    },
    wrapperNone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '700'
    },
    textInput: {
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: 100,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

    },
    button: {
        width: 100,
        alignSelf: 'flex-end',
        backgroundColor: '#0089ec',
        borderRadius: 10,
        padding: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600'
    }
})