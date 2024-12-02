import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from '../../style';
import { useEffect, useState } from 'react';
import { firebase, db, ref, onValue, get } from '../../config'
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import Slider from '@react-native-community/slider';

const Devices = ({ user }) => {
    const [durum, setDurum] = useState();
    const [parlaklik, setParlaklik] = useState();
    const [isim, setIsim] = useState();
    const [controlText, setControlText] = useState();
    const [mac, setMac] = useState();
    const [macIsim, setMacIsim] = useState();


    //espDevices ten okunan veriler
    const [readKey, setReadKey] = useState();
    const [readDurum, setReadDurum] = useState();
    const [readParlaklik, setReadParlaklik] = useState();

    //cihaz mac adresi ve ismi alınır
    useEffect(() => {
        var macArray = [];
        var macIsimArray = [];
        const dbref = ref(db, `userInfo/${user.userData.id}/myDevices/`);
        const listener = onValue(dbref, (snapshot) => {
            macIsimArray = [];
            macArray = [];
            snapshot.forEach(element => {
                const key = element.key;
                const value = element.val();
                if (value.mac) {
                    macArray.push(value.mac);
                    macIsimArray.push(key);
                    setMac(macArray);
                    setMacIsim(macIsimArray);
                }
            });
        });
        return () => listener();
    }, []);

    // alınan cihaz bilgileri kullanılacak değişkenlere aktarılır
    useEffect(() => {
        var parlak = [];
        var dur = [];
        if (mac != undefined && readDurum != undefined && readParlaklik != undefined && readKey != undefined) {
            for (let i = 0; i < mac.length; i++) {
                if (mac[i] == readKey[i]) {
                    parlak.push(readParlaklik[i]);
                    dur.push(readDurum[i]);
                }
            }
        }
        setParlaklik(parlak);
        setDurum(dur);
    }, [readDurum, readParlaklik, mac, macIsim]);

    //espDevices ten cihaz bilgileri alınır
    useEffect(() => {
        var key;
        var durum;
        var parlaklik;
        const dbref = ref(db, `espDevice/`);
        const listener = onValue(dbref, (snapshot) => {
            key = [];
            durum = [];
            parlaklik = [];
            snapshot.forEach(element => {
                key.push(element.key);
                durum.push(element.val().ledDurum);
                parlaklik.push(element.val().parlaklik);
            });
            setReadKey(key);
            setReadDurum(durum);
            setReadParlaklik(parlaklik);
        });
        return () => listener();
    }, []);

    //mac adresi alınan cihazı kullanıcıya ekler
    const macControl = async () => {
        const dbref = ref(db, 'espDevice/');
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            const key = element.key;
            if (controlText == key && isim) {
                if (user.tur == "eposta") {
                    firebase.database().ref(`userInfo/${user.userData.id}/myDevices/${isim}`).set({
                        mac: key
                    });
                }
            }
        });
    }

    const led = (i) => {
        firebase.database().ref(`espDevice/${mac[i]}/`).set({
            ledDurum:durum[i] == 0 ? 1 :0,
            parlaklik:parlaklik[i]
        });
    }

    const parlak = (val,i) => {
        firebase.database().ref(`espDevice/${mac[i]}/`).set({
            ledDurum:durum[i],
            parlaklik:val
        });
    }

    const render = (item) => {
        return (
            <>
                <Text style={styles.header}>
                    {item.item}
                </Text>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { led(item.index) }} activeOpacity={0.5} style={Styles.container}>
                        {
                            durum[item.index] == 0 ?
                                <>
                                    <MaterialCommunityIcons name="lightbulb-off" size={60} color="white" style={{ marginRight: 10 }} />
                                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                                        Ledi Aç
                                    </Text>
                                </> :
                                durum[item.index] == 1 ?
                                    <>
                                        <MaterialCommunityIcons name="lightbulb-on" size={60} color="white" style={{ marginRight: 10 }} />
                                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                                            Ledi Kapat
                                        </Text>
                                    </>
                                    : null
                        }
                    </TouchableOpacity>
                    <View style={[Styles.container, { marginTop: 10, flexDirection: 'column' }]}>
                        <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                            parlaklık:
                            %{Math.floor((parlaklik[item.index] / 255) * 100)}
                        </Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={255}
                            step={1}
                            value={parlaklik[item.index]}
                            onSlidingComplete={(value) => parlak(value,item.index)}
                            minimumTrackTintColor="#1fb28a"
                            maximumTrackTintColor="white"
                            thumbTintColor="white"
                        />
                    </View>
                </View>
            </>
        )
    }

    return (
        <View style = {{flex:1}}>
            <Text style={styles.header}>Cihazlarım</Text>
            <View>
                <View style={[styles.inputContainer, { backgroundColor: "#FF5733" }]}>
                    <TextInput
                        onChangeText={(value) => { setControlText(value) }}
                        style={[styles.textInput, { color: "white", }]}
                        placeholderTextColor={"white"}
                        placeholder="Mac Adresi"
                    />
                </View>
                <View style={[styles.inputContainer, { backgroundColor: "#FF5733" }]}>
                    <TextInput
                        onChangeText={(value) => { setIsim(value) }}
                        style={[styles.textInput, { color: "white", }]}
                        placeholderTextColor={"white"}
                        placeholder="Cihaz ismi"
                    />
                </View>
                <Button
                    title='cihaz ekle'
                    onPress={() => { macControl() }}
                />
            </View>

            <FlatList
                data={macIsim}
                renderItem={render}
            />
        </View>
    )
}

export default Devices;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 125,
        width: 250,
        borderRadius: 15
    }
});