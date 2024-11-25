import { Text, View } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../components/progressBar';
import { db, ref, onValue } from '../../config'
import { useEffect, useState } from 'react';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Main = ({ userData }) => {
    const [elektrik, setElektrik] = useState(0);
    const [su, setSu] = useState(0);
    const [gaz, setGaz] = useState(0);
    const path = 'userInfo/' + userData.name + '/';

    useEffect(() => {
        const dbref = ref(db, path + 'sayac/');
        const listen = onValue(dbref, (snapshot) => {
            snapshot.forEach(element => {
                const key = element.key;
                const value = element.val();
                key == "elektrik" ? setElektrik(value) : key == "su" ? setSu(value) : key == "gaz" ? setGaz(value) : null
            });
        });
        return () => listen();
    }, []);

    console.log(`\n Elektrik: ${elektrik} \n Su: ${su} \n Gaz: ${gaz}`);

    const Item = ({ title, icon, color, unit }) => (
        <View style={styles.item}>
            <View style={styles.itemIcon}>
                <MaterialCommunityIcons name={icon} size={60} color={color} style={styles.icon} />
            </View>
            <View style={styles.itemContent}>
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.percent}>
                        <Text style={styles.largeText}>100</Text>
                        <Text style={styles.smallText}>/0 {unit}</Text>
                    </View>
                </View>
                <ProgressBar progress={0.9} color={color} />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.topContainer}>
                <Text style={styles.header}>Ana sayfa</Text>
                <View style={styles.statusContent}>
                    <Text style={styles.header2}>Sayaç Durumları</Text>
                    <Item title="Elektirik" icon="lightning-bolt" color="#f2bd11" unit="kWh" />
                    <Item title="Su" icon="water" color='#09d1fb' unit="L" />
                    <Item title="Doğalgaz" icon="fire" color="gray" unit="m³" />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Main;