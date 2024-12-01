import { Text, View, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import { useEffect, useState } from 'react';
import Slider from '@react-native-community/slider';
import { firebase, db, ref, onValue, get } from '../../config'

const Global = () => {
    const [durum, setDurum] = useState(0);
    const [parlaklik, setParlaklik] = useState();

    useEffect(() => {
        const dbref = ref(db, 'led/');
        const listener = onValue(dbref, (snapshot) => {
            const value = snapshot.val();
            setDurum(value.ledDurum);
            setParlaklik(value.parlaklik);
        });
        return () => listener();
    }, []);

    const led = async () => {
        await firebase.database().ref('led/').set({
            ledDurum: durum == 1 ? 0 : 1,
            parlaklik:parlaklik
        });
    }

    const parlak = async (val) => {
        await firebase.database().ref('led/').set({
            ledDurum:durum,
            parlaklik: val,
        });
        setParlaklik(val);
    }

    return (
        <View style={{ height: "100%", justifyContent: 'center', alignItems: 'center',backgroundColor:"darkblue" }}>
            <TouchableOpacity onPress={() => { led() }} activeOpacity={0.5} style={styles.container}>
                {
                    durum == 0 ?
                        <>
                            <MaterialCommunityIcons name="lightbulb-off" size={60} color="white" style={{ marginRight: 10 }} />
                            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                                Ledi Aç
                            </Text>
                        </> :
                        durum == 1 ?
                            <>
                                <MaterialCommunityIcons name="lightbulb-on" size={60} color="white" style={{ marginRight: 10 }} />
                                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                                    Ledi Kapat
                                </Text>
                            </>
                            : null
                }
            </TouchableOpacity>
            <View style={[styles.container, { marginTop: 10,flexDirection:'column' }]}>
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 18 }}>
                    parlaklık:
                    %{Math.floor((parlaklik / 250)*100)}
                </Text>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={250}
                    step={1}
                    value={parlaklik}
                    onSlidingComplete={(value) => parlak(value)}
                    minimumTrackTintColor="#1fb28a"
                    maximumTrackTintColor="white"
                    thumbTintColor="white"
                />
            </View>
        </View>
    )
}

export default Global;

const styles = StyleSheet.create({
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