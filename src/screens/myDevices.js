import { Text, View, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from '../../style';
import { useEffect, useState } from 'react';
import { firebase, db, ref, onValue, get } from '../../config'
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import Slider from '@react-native-community/slider';

const Devices = ({ user }) => {
    const [adress, setAdress] = useState();
    const [name, setName] = useState();
    const [deviceName, setDeviceName] = useState();
    const [deviceAdress, setDeviceAdress] = useState();
    const [durum, setDurum] = useState();
    const [parlaklik, setParlaklik] = useState();
    const [lightData, setLightData] = useState();

    var path;

    if (user.tur == "kullanici") { //Eğer kullanıcı girişi ise giriş türünü kullanici database yolunu da kullanıcıya göre ayarlar
        path = `userInfo/${user.user}/myDevices/`;
    } else if (user.tur == "eposta") { //Eğer eposta girişi ise giriş türünü eposta database yolunu da id bilgisine göre ayarlar
        path = `userInfo/${user.userData.id}/myDevices/`;
    } else { //Eğer google girişi ise giriş türünü google database yolunu da emaile göre ayarlar
        path = `userInfo/${user.user.id}/myDevices/`;
    }

    //////////////////////////////////////////////////////////////
    // Gösterilecek hiç cihaz verisi yok ise değişkenleri boşalt//
    //////////////////////////////////////////////////////////////
    useEffect(()=>{
        if (deviceName == "" || deviceAdress == "") {
            setDurum("");
            setParlaklik("");
            setLightData([]);
        }
    },[deviceAdress,deviceName]);

    ////////////////////////////////////////////////////////
    // durum ve parlaklık verilerini değişkenlere aktarır //
    ////////////////////////////////////////////////////////
    useEffect(() => {
        if (deviceAdress && deviceName) {
            const dbref = ref(db, `espDevice/`);
            const listener = onValue(dbref, (snapshot) => {
                let durum = [];
                let parlaklik = [];
                snapshot.forEach(element => {
                    const key = element.key;
                    const value = element.val();
                    if (control(key) == true) {
                        durum.push(value.ledDurum);
                        parlaklik.push(value.parlaklik);
                        setParlaklik(parlaklik);
                        setDurum(durum);
                    }
                });
            });
            return () => listener();
        }
    }, [deviceName, deviceAdress]);

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
                data.push({ title: deviceName[i], mac: deviceAdress[i], durum: durum[i], parlaklik: parlaklik[i] });
                setLightData(data);
            }
        }
    }, [durum, parlaklik])

    /////////////////////////////////////////////////////////////////
    // Kayıtlı olan cihaz bilgilerini kullanıcının hesabından çeker//
    /////////////////////////////////////////////////////////////////
    useEffect(() => {
        const dbref = ref(db, path);
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
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // kullanıcının girdiği mac adresini veri tabanında bulunan esp cihazlarının mac adresiyle karşılaştırır ve kullanıcının cihazlarının bulunduğu klasöre ekler//
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async function adressControl() {
        var devam = false;
        const dbref = ref(db, path);
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            const value = element.val();
            if (name == element.key || adress == value.mac) {
                devam = true;
            }
        });
        if (!devam) {
            createAdress();
        } else {
            console.log("Geçerli bir cihaz gir")
        }
    }

    async function createAdress() {
        const dbref = ref(db, 'espDevice/');
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            const key = element.key;
            if (adress == key && name) {
                firebase.database().ref(`${path}/${name}`).set({
                    mac: key
                });
            }
        });
    }

    const led = (i, d, p) => {
        firebase.database().ref(`espDevice/${i}/`).set({
            ledDurum: d == 0 ? 1 : 0,
            parlaklik: p
        });
    }

    const parlak = (val, i, d) => {
        firebase.database().ref(`espDevice/${i}/`).set({
            ledDurum: d,
            parlaklik: val
        });
    }

    const renderItem = ({ item }) => {
        return (
            <>
                {}
                <Text style={styles.header}>
                    {item.title}
                </Text>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { led(item.mac, item.durum, item.parlaklik) }} activeOpacity={0.5} style={Styles.container}>
                        {
                            item.durum == 0 ?
                                <>
                                    <MaterialCommunityIcons name="lightbulb-off" size={60} color="white" style={{ marginRight: 10 }} />
                                    <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                                        Ledi Aç
                                    </Text>
                                </> :
                                item.durum == 1 ?
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
                            %{Math.floor((item.parlaklik / 255) * 100)}
                        </Text>
                        <Slider
                            style={{ width: 200, height: 40 }}
                            minimumValue={0}
                            maximumValue={255}
                            step={1}
                            value={item.parlaklik}
                            onSlidingComplete={(value) => parlak(value, item.mac, item.durum)}
                            minimumTrackTintColor="#1fb28a"
                            maximumTrackTintColor="white"
                            thumbTintColor="white"
                        />
                    </View>
                </View>
            </>
        )
    };

    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.header}>Cihazlarım</Text>
            <View>
                <View style={[styles.inputContainer, { backgroundColor: "#FF5733", height: 60 }]}>
                    <TextInput
                        value={adress}
                        onChangeText={(value) => { setAdress(value) }}
                        style={[styles.textInput, { color: "white", }]}
                        placeholderTextColor={"white"}
                        placeholder="Mac Adresi"
                    />
                </View>
                <View style={[styles.inputContainer, { backgroundColor: "#FF5733", height: 60 }]}>
                    <TextInput
                        value={name}
                        onChangeText={(value) => { setName(value) }}
                        style={[styles.textInput, { color: "white", }]}
                        placeholderTextColor={"white"}
                        placeholder="Cihaz ismi"
                    />
                </View>
                <Button
                    title='cihaz ekle'
                    onPress={() => { adressControl() }}
                />
            </View>
            <FlatList
                data={lightData}
                renderItem={renderItem}
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