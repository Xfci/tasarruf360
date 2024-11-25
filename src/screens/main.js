import { Text, View } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../components/progressBar';
import { db, ref, onValue, get } from '../../config'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const Item = ({ title, icon, color, unit, value, value2 }) => (
    <View style={styles.item}>
        <View style={styles.itemIcon}>
            <MaterialCommunityIcons name={icon} size={60} color={color} style={styles.icon} />
        </View>
        <View style={styles.itemContent}>
            <View style={styles.itemHeaderContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.percent}>
                    <Text style={styles.largeText}>{value}</Text>
                    <Text style={styles.smallText}>/{value2} {unit}</Text>
                </View>
            </View>
            <ProgressBar progress={1 / (value2 / value)} color={color} />
        </View>
    </View>
);

const Main = ({ userData }) => {
    const [electric, setElectric] = useState();
    const [water, setWater] = useState();
    const [gas, setGas] = useState();

    const [usedElectric, setUsedElectric] = useState();
    const [usedWater, setUsedWater] = useState();
    const [usedGas, setUsedGas] = useState();

    const [electricState, setElectricState] = useState();
    const [wateState, setWaterState] = useState();
    const [gasState, setGasState] = useState();
    const path = 'userInfo/' + userData.name + '/';


    useEffect(() => {
        const dbref = ref(db, path + 'sayac/');
        const listen = onValue(dbref, (snapshot) => {
            snapshot.forEach(element => {
                const baslik = element.key;
                const deger = element.val()
                if (baslik == "elektrik") {
                    setElectric(deger.electric);
                    setUsedElectric(deger.usedElectric);
                    setElectricState(deger.state);
                } else if (baslik == "water") {
                    setWater(deger.water);
                    setUsedWater(deger.usedWater);
                    setWaterState(deger.state);
                } else if (baslik == "gas") {
                    setGas(deger.gas);
                    setUsedGas(deger.usedGas);
                    setGasState(deger.state);
                }
            });
        });
        return () => listen();
    }, []);

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.header}>Ana sayfa</Text>
            <ScrollView>
                <View style={styles.topContainer}>
                    <View style={styles.statusContent}>
                        <Text style={styles.header2}>Sayaç Durumları</Text>
                        <Item title="Elektirik" icon="lightning-bolt" color="#f2bd11" unit="kWh" value={electric} value2={usedElectric} />
                        <Item title="Su" icon="water" color='#09d1fb' unit="L" value={water} value2={usedWater} />
                        <Item title="Doğalgaz" icon="fire" color="gray" unit="m³" value={gas} value2={usedGas} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Main;