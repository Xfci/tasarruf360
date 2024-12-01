import { Text, View, TextInput, Button } from 'react-native'
import { styles } from '../../style';
import { useEffect, useState } from 'react';
import { firebase, db, ref, onValue, get } from '../../config'

const Devices = ({ user }) => {
    const [durum, setDurum] = useState();
    const [parlaklik, setParlaklik] = useState();
    const [mac, setMac] = useState();
    const [path, setPath] = useState();
    const [isim, setIsim] = useState();
    const [cihaz, setCihaz] = useState();
    const cihazArray = [];

    /*const macControl = async () => {
        const dbref = ref(db, 'espDevice/');
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            const key = element.key;
            const value = element.val();
            if (mac == key) {
                setDurum(value.ledDurum);
                setParlaklik(value.parlaklik);
                setPath(`espDevice/${mac}`);
            }
        });
        if (user.tur == "eposta") {
            await firebase.database().ref(`userInfo/${user.userData.id}/myDevices/${isim}/`).set({
                mac: mac,
                ledDurum: durum,
                parlaklik: parlaklik
            });
        }
    }

    useEffect(() => {
        const dbref = ref(db, `userInfo/${user.userData.id}/myDevices/${isim}/`);
        const listener = onValue(dbref, (snapshot) => {
            snapshot.forEach(element => {
                const key = element.key;
                const value = element.val();
                if (key == "mac") {
                    cihazArray.push(value);
                    console.log(cihazArray);
                }
            });
        });
        setCihaz(cihazArray);
        console.log("cihaz: ",cihaz);
        return () => listener();
    }, []);*/

    return (
        <View>
            <Text style={styles.header}>Cihazlarım</Text>
            <View>
                <View style={[styles.inputContainer, { backgroundColor: "#FF5733" }]}>
                    <TextInput
                        onChangeText={(value) => { setMac(value) }}
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

        </View>
    )
}

export default Devices;