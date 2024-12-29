import { Text, View, StatusBar, Dimensions } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, ref, onValue } from '../../config'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-gifted-charts';
import { Item } from '../components/progressItem';
import tinycolor from 'tinycolor2';

export var path; //database yolu
export var type; //giriş türünü tutar
export var userId;

const Main = ({ user }) => {
    const screenWidth = Dimensions.get('window').width;

    const [electric, setElectric] = useState(0);
    const [water, setWater] = useState(0);
    const [gas, setGas] = useState(0);

    const [usedElectric, setUsedElectric] = useState(0);
    const [usedWater, setUsedWater] = useState(0);
    const [usedGas, setUsedGas] = useState(0);

    const [electricState, setElectricState] = useState();
    const [wateState, setWaterState] = useState();
    const [gasState, setGasState] = useState();

    if (!path) {
        if (user.tur == "kullanici") { //Eğer kullanıcı girişi ise giriş türünü kullanici database yolunu da kullanıcıya göre ayarlar
            path = 'userInfo/' + user.user + '/';
            type = "kullanici"
            userId = user.user;
        } else if (user.tur == "eposta") { //Eğer eposta girişi ise giriş türünü eposta database yolunu da id bilgisine göre ayarlar
            path = 'userInfo/' + user.userData.id + '/';
            type = "eposta"
            userId = user.userData.id;
        } else { //Eğer google girişi ise giriş türünü google database yolunu da emaile göre ayarlar
            path = 'userInfo/' + user.user.id + '/';
            type = "google"
            userId = user.user.id;
        }

    }

    useEffect(() => {
        const dbref = ref(db, path + 'sayac/');
        const listen = onValue(dbref, (snapshot) => {
            snapshot.forEach(element => {
                const baslik = element.key;
                const deger = element.val()
                if (baslik == "electric") {
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
            <Text style={styles.header}>Gösterge</Text>
            <ScrollView>
                <View style={styles.statusContent}>
                    <Text style={styles.header2}>Sayaç Durumları</Text>
                    <Item title="Elektirik" icon="lightning-bolt" color="#f2bd11" unit="kWh" value={electric} value2={usedElectric} />
                    <Item title="Su" icon="water" color='#09d1fb' unit="L" value={water} value2={usedWater} />
                    <Item title="Doğalgaz" icon="fire" color="gray" unit="m³" value={gas} value2={usedGas} />
                </View>

                <View style={styles.statusContent}>
                    <Text style={styles.header2}>Özetler</Text>
                    <BarChart
                        isAnimated
                        data={[{ value: usedElectric, frontColor: tinycolor('#f2bd11').darken(10).toString(), gradientColor: '#f2bd11', label: "Elektrik" }, { value: usedWater, frontColor: tinycolor('#09d1fb').darken(10).toString(), gradientColor: '#09d1fb', label: "Su" }, { value: usedGas, frontColor: tinycolor('gray').darken(10).toString(), gradientColor: 'gray', label: "Gaz" }]}
                        width={screenWidth*0.7}
                        minHeight={5}
                        barBorderRadius={3}
                        noOfSections={5}
                        yAxisThickness={0}
                        xAxisThickness={0}
                        xAxisLabelTextStyle={{ color: 'gray' }}
                        yAxisTextStyle={{ color: 'gray' }}
                        showGradient={true}
                        spacing={120}
                    />
                </View>
            </ScrollView>
            <StatusBar barStyle={'light-content'} />
        </SafeAreaView>
    )
}

export default Main;