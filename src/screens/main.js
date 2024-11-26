import { Text, View,Image,Button } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, ref, onValue, get } from '../../config'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-gifted-charts';
import { Item } from '../components/progressItem';

const Main = ({ userData,user }) => {
    const [electric, setElectric] = useState(0);
    const [water, setWater] = useState(0);
    const [gas, setGas] = useState(0);

    const [usedElectric, setUsedElectric] = useState(0);
    const [usedWater, setUsedWater] = useState(0);
    const [usedGas, setUsedGas] = useState(0);

    const [electricState, setElectricState] = useState();
    const [wateState, setWaterState] = useState();
    const [gasState, setGasState] = useState();

    if (userData != undefined) {
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
                    <View style={styles.statusContent}>
                        <Text style={styles.header2}>Sayaç Durumları</Text>
                        <Item title="Elektirik" icon="lightning-bolt" color="#f2bd11" unit="kWh" value={electric} value2={usedElectric} />
                        <Item title="Su" icon="water" color='#09d1fb' unit="L" value={water} value2={usedWater} />
                        <Item title="Doğalgaz" icon="fire" color="gray" unit="m³" value={gas} value2={usedGas} />
                    </View>

                    <View style={styles.statusContent}>
                        <Text style={styles.header2}>Özetler {usedElectric}</Text>
                        <BarChart
                            data={[{ value: usedElectric, frontColor: '#f2bd11' }, { value: usedWater, frontColor: '#09d1fb' }, { value: usedGas, frontColor: 'gray' }]}
                            width={200}
                            minHeight={5}
                            barBorderRadius={3}
                            noOfSections={5}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            xAxisLabelTextStyle={{ color: 'gray' }}
                            yAxisTextStyle={{ color: 'gray' }}
                            isAnimated
                            animationDuration={1000}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }else{
        console.log(user.email)
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 2, borderColor: "black", padding: 20, marginBottom: 10 }}>
                    <Image style={{ width: 100, height: 100,marginRight: 20 }} source={{ uri: user.picture }} />
                    <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                        <Text>
                            E-MAİL : {user.email}
                        </Text>
                        <Text>
                            Ad : {user.given_name}
                        </Text>
                        <Text>
                            Soyad : {user.family_name}
                        </Text>
                        <Text>
                            Google Id : {user.id}
                        </Text>
                    </View>
                </View>
                <Button title='Oturumu Kapat' onPress={async () => {
                    await AsyncStorage.removeItem("@user");
                    navigation.replace('login');
                }}/>
            </View>
        )
    }
}

export default Main;