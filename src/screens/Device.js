import { StyleSheet, Text, View, Image, ScrollView, Switch, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, AlertIOS,StatusBar } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import Slider from '@react-native-community/slider';
import { firebase, db, ref, onValue } from '../../config'
import { path } from '../screens/myDevices';

export default function Device({ route }) {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const [selected, setSelected] = useState("");
    const [durum, setDurum] = useState();
    const [parlaklik, setParlaklik] = useState();
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    var data = route.params;

    useEffect(() => {
        if (data.tur == "ışık") {
            const dbref = ref(db, `espDevice/${data.mac}`);
            const listener = onValue(dbref, (snapshot) => {
                const value = snapshot.val();
                try {
                    setDurum(value.ledDurum);
                    setParlaklik(value.parlaklik);
                } catch (error) {

                }
            });
            return () => listener();
        }
    }, []);

    const mekanlar = [
        { key: '1', value: 'Mekan 1', disabled: true },
        { key: '2', value: 'Oda 1' },
        { key: '3', value: 'Oda 2' },
        { key: '4', value: 'Mekan 2', disabled: true },
        { key: '5', value: 'Oda 1' },
        { key: '6', value: 'Oda 2' },
        { key: '7', value: 'Oda 3' },
    ]

    const createTwoButtonAlert = () => {
        Alert.alert('CİHAZA BAĞLANIN', 'Cihazın üzerindeki reset tuşunu basılı tutun ve ekranda MAC adresinin yazdığına emin olun.', [
            { text: 'RESETLEDİM', onPress: () => navigation.navigate('webview') },
            {
                text: 'iptal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive',
            },
        ])
    };

    const closeAlert = () => {
        Alert.alert('Emin Misin?', 'Cihazı sildikten sonra tekrar kullanmak için resetlemen gerekir.', [
            {
                text: 'iptal',
                onPress: () => console.log('Cancel Pressed'),
                style: 'destructive',
            },
            { text: 'Evet', onPress: () => deleteDevice() },
        ])
    };

    const deleteDevice = async () => {
        await firebase.database().ref(`espDevice/${data.mac}/`).remove();
        await firebase.database().ref(`${path}myDevices/${data.title}`).remove();
        navigation.goBack();
    };

    const led = () => {
        firebase.database().ref(`espDevice/${data.mac}/`).set({
            ledDurum: durum == 0 ? 1 : 0,
            parlaklik: parlaklik,
            state: data.state,
            SSID: data.SSID
        });
    }

    const parlak = (val) => {
        firebase.database().ref(`espDevice/${data.mac}/`).set({
            ledDurum: durum,
            parlaklik: val,
            state: data.state,
            SSID: data.SSID
        });
    }

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
                    <Text style={styles.headerTitle}>{data.title}</Text>
                    <Text style={styles.macTitle}>Mekan 1 - {data.tur}</Text>
                    <Text style={styles.macTitle}>{data.mac}</Text>
                    <Text style={[styles.header2, { color: 'green', fontSize: 16 }]}>{data.state ? "Aktif ●" : "Pasif ⊝"}</Text>
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
                        {
                            data.tur == "ışık" ?
                                <>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => { led() }} activeOpacity={0.5} >
                                            {
                                                durum == 0 ?
                                                    <>
                                                        <MaterialCommunityIcons name="lightbulb-off" size={60} color="black" />
                                                        <Text style={{ color: "black", fontWeight: 'bold', fontSize: 18 }}>
                                                            Ledi Aç
                                                        </Text>
                                                    </> :
                                                    durum == 1 ?
                                                        <>
                                                            <MaterialCommunityIcons name="lightbulb-on" size={60} color="black" />
                                                            <Text style={{ color: "black", fontWeight: 'bold', fontSize: 18 }}>
                                                                Ledi Kapat
                                                            </Text>
                                                        </>
                                                        : null
                                            }
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                            <Text style={{ color: "black", fontWeight: 'bold', fontSize: 18 }}>
                                                parlaklık:
                                                %{Math.floor((parlaklik / 255) * 100)}
                                            </Text>
                                            <Slider
                                                style={{ width: 200, height: 40 }}
                                                minimumValue={0}
                                                maximumValue={255}
                                                step={1}
                                                value={parlaklik}
                                                onSlidingComplete={(value) => parlak(value)}
                                                minimumTrackTintColor="#1fb28a"
                                                maximumTrackTintColor="black"
                                                thumbTintColor="black"
                                            />
                                        </View>
                                    </View>
                                </>
                                : <>
                                    <View style={styles.wrapper}>
                                        <Text style={styles.text}>Harcanılan</Text>
                                        <Text>2020 kw</Text>
                                    </View>
                                    <View style={styles.wrapper}>
                                        <Text style={[styles.text, { flex: 2 }]}>İstenen (kw)</Text>
                                        <View style={styles.textInput}>
                                            <TextInput placeholder='1000' />
                                        </View>
                                    </View>
                                </>
                        }
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
                                    <Text>{data.SSID}</Text>
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
                                <TextInput placeholder={data.title} />
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
            <StatusBar barStyle={'dark-content'} />

        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        gap: 4,
        height: 350,
        backgroundColor: '#f2bd11',
        borderBottomLeftRadius: '20%',
        borderBottomRightRadius: '20%',
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
        maxWidth: 600,
        alignSelf: 'center'
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
        flex: 1,
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