import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, StatusBar, Keyboard, Image } from 'react-native'
import { styles } from '../../style';
import { useEffect, useState } from 'react';
import { firebase, db, ref, onValue } from '../../config'
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import Slider from '@react-native-community/slider';
import React, { useRef } from "react";
import { Modalize } from "react-native-modalize";
import { AntDesign } from '@expo/vector-icons/';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerLayoutAndroid, ScrollView } from 'react-native-gesture-handler';
import { KeyboardState } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { fetchUserData } from '../scripts/fetchUserData';

export var path;

const Devices = ({ user }) => {
    const [adress, setAdress] = useState();
    const [name, setName] = useState();
    const [deviceName, setDeviceName] = useState();
    const [deviceAdress, setDeviceAdress] = useState();
    const [durum, setDurum] = useState();
    const [parlaklik, setParlaklik] = useState();
    const [SSID, setSSID] = useState();
    const [state, setState] = useState();
    const [lightData, setLightData] = useState();
    const [sayac, setSayac] = useState();
    const modalizeRef = useRef(null);
    const [data, setData] = useState([]);

    const navigation = useNavigation();

    const openModal = () => {
        modalizeRef.current?.open();
    };
    const closeModal = () => {
        modalizeRef.current?.open();
    };

    useEffect(() => {
        const getData = async () => {
            const id = await fetchUserData();
            setData(id);
        }
        getData();
    }, []);

    useEffect(() => {
        path = `userInfo/${data[0]}/`;
    }, [data]);


    useEffect(() => {
        const dbref = ref(db, `${path}/sayac`);
        const listener = onValue(dbref, (snapshot) => {
            var data = [];
            snapshot.forEach(element => {
                const key = element.key;
                const value = element.val();
                if (value.state == true) {
                    data.push({ title: key == "electric" ? "Elektrik şalteri" : key == "water" ? "Su vanası" : key == "gas" ? "Gaz vanası" : null, mac: value.mac, state: value.state, ssid: value.SSID });
                }
            });
            setSayac(data);
        });
        return () => listener();
    }, [data]);

    //////////////////////////////////////////////////////////////
    // Gösterilecek hiç cihaz verisi yok ise değişkenleri boşalt//
    //////////////////////////////////////////////////////////////
    useEffect(() => {
        if (deviceName == "" || deviceAdress == "") {
            setDurum("");
            setParlaklik("");
            setLightData([]);
        }
    }, [deviceAdress, deviceName, data]);

    ////////////////////////////////////////////////////////
    // durum ve parlaklık verilerini değişkenlere aktarır //
    ////////////////////////////////////////////////////////
    useEffect(() => {
        if (deviceAdress && deviceName) {
            const dbref = ref(db, `espDevice/`);
            const listener = onValue(dbref, (snapshot) => {
                let durum = [];
                let parlaklik = [];
                let state = [];
                let SSID = [];
                snapshot.forEach(element => {
                    const key = element.key;
                    const value = element.val();
                    if (control(key) == true) {
                        durum.push(value.ledDurum);
                        parlaklik.push(value.parlaklik);
                        SSID.push(value.SSID);
                        state.push(value.state);
                        setParlaklik(parlaklik);
                        setDurum(durum);
                        setSSID(SSID);
                        setState(state);
                    }
                });
            });
            return () => listener();
        }
    }, [deviceName, deviceAdress, data]);

    function control(k) {
        var a = false;
        for (let i = 0; i <= deviceAdress.length; i++) {
            if (k == deviceAdress[i]) {
                a = true;
            }
        }
        return a;
    }

    ///////////////////////////////////////////////////////////////////////
    // IŞIK cihazları için varolan verileri lightData değişkenine aktarır//
    ///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        if (deviceAdress && deviceName && durum && parlaklik) {
            var data = [];
            for (let i = 0; i < deviceName.length; i++) {
                data.push({ title: deviceName[i], mac: deviceAdress[i], durum: durum[i], parlaklik: parlaklik[i], SSID: SSID[i], state: state[i] });
                setLightData(data);
            }
        }
    }, [durum, parlaklik, data])

    /////////////////////////////////////////////////////////////////
    // Kayıtlı olan cihaz bilgilerini kullanıcının hesabından çeker//
    /////////////////////////////////////////////////////////////////
    useEffect(() => {
        const dbref = ref(db, `${path}/myDevices/`);
        const listener = onValue(dbref, (snapshot) => {
            var deviceNameArray = [];
            var deviceAdressArray = [];
            snapshot.forEach(element => {
                const key = element.key;
                const value = element.val();
                deviceNameArray.push(key);
                deviceAdressArray.push(value.mac);
            });
            setDeviceName(deviceNameArray);
            setDeviceAdress(deviceAdressArray);
        });
        return () => listener();
    }, [data]);

    const renderLightItem = ({ item }) => {
        function git() {
            const data = {
                title: item.title,
                SSID: item.SSID,
                mac: item.mac,
                state: item.state,
                tur: "ışık"
            }
            navigation.navigate('device', data);
        }

        return (
            <TouchableOpacity style={styles.item} onPress={() => git()}>
                <View style={styles.itemIcon}>
                    <Image source={require('../../assets/images/lamp.png')} style={{ height: 50, width: 50, marginRight: 15 }} />
                </View>
                <View style={styles.itemContent}>
                    <View style={styles.itemHeaderContainer}>
                        <Text style={styles.deviceTitle}>{item.title}</Text>
                        <Text style={styles.deviceParentTitle}>Mekan 1</Text>
                    </View>
                    <Text style={styles.macTitle}>{item.mac}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    const renderSayacItem = ({ item }) => {
        function git() {
            const data = {
                title: item.title,
                SSID: item.ssid,
                mac: item.mac,
                state: item.state,
                tur: "sayac"
            }
            console.log(item);
            navigation.navigate('device', data);
        }
        return (
            <TouchableOpacity style={styles.item} onPress={() => git(item)}>
                <View style={styles.itemIcon}>
                    {
                        item.title == "Elektrik şalteri" ?
                            <Image source={require('../../assets/images/electrical-panel.png')} style={{ height: 50, width: 50, marginRight: 15 }} /> :
                            item.title == "Su vanası" ?
                                <Image source={require('../../assets/images/water-meter.png')} style={{ height: 50, width: 50, marginRight: 15 }} /> :
                                item.title == "Gaz vanası" ?
                                    <Image source={require('../../assets/images/pressure-meter.png')} style={{ height: 50, width: 50, marginRight: 15 }} /> : null
                    }
                </View>
                <View style={styles.itemContent}>
                    <View style={styles.itemHeaderContainer}>
                        <Text style={styles.deviceTitle}>{item.title}</Text>
                        <Text style={styles.deviceParentTitle}>Mekan 1</Text>
                    </View>
                    <Text style={styles.macTitle}>{item.mac}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.header}>Cihazlarım</Text>
            <ScrollView>
                <View style={styles.statusContent}>
                    <Image source={require('../../assets/images/add-device.png')} style={{ height: 100, width: 120, alignSelf: 'center', margin: 10 }} />
                    <TouchableOpacity style={[styles.button, { marginBottom: 10, flexDirection: 'row' }]} onPress={() => navigation.navigate('step1')}>
                        <Text style={styles.appButtonText}>Cihaz Ekle </Text>
                        <MaterialCommunityIcons name="plus-circle" size={24} color={'white'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.statusContent}>
                    <Text style={[styles.header2, { color: 'green' }]}>Aktif ●</Text>
                    <FlatList
                        data={sayac}
                        renderItem={renderSayacItem}
                        scrollEnabled={false}
                    />
                    <FlatList
                        data={lightData}
                        renderItem={renderLightItem}
                        scrollEnabled={false}
                    />
                </View>

                <View style={styles.statusContent}>
                    <Text style={[styles.header2, { color: '#9c0000' }]}>Pasif ⊝</Text>
                    <Text style={styles.emptyTitle}>Pasif cihaz bulunamamıştır.</Text>
                </View>
            </ScrollView>
            <StatusBar barStyle={'dark-content'} />
        </SafeAreaView>
    )
}

export default Devices;