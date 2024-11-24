import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, Text, View, FlatList } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../components/progressBar';

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

const Item = ({ title, icon, color }) => (
    <View style={styles.item}>
        <View style={styles.itemIcon}>
            <MaterialCommunityIcons name={icon} size={60} color={color} style={styles.icon} />
        </View>
        <View style={styles.itemContent}>
            <Text style={styles.title}>{title}</Text>
            <ProgressBar progress={1} color={color} />
        </View>
    </View>
);


const Main = ({ navigation, route, userData }) => {
    return (
        <SafeAreaView style={styles.appContainer}>
            <View style={styles.topContainer}>
                <Text style={styles.header}>Ana sayfa</Text>
                <View style={styles.statusContent}>
                    <Text style={styles.header2}>Sayaç Durumları</Text>
                    <Item title="Elektirik" icon="lightning-bolt" color="#f2bd11" />
                    <Item title="Su" icon="water" color='lightblue' />
                    <Item title="Doğalgaz" icon="fire" color="gray"/>
                </View>
            </View>

        </SafeAreaView>
    )

    /*const user = route.params.user;T

    if (user) {
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 2, borderColor: "black", padding: 20, borderRadius: 15, marginBottom: 10 }}>
                    <Image style={{ width: 100, height: 100, borderRadius: "100%", marginRight: 20 }} source={{ uri: user.picture }} />
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
                }} />
            </View>
            )
    } else {

            }*/
}

export default Main;