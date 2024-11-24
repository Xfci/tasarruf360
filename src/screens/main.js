import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Image, Text, View } from 'react-native'

const Main = ({ navigation, route, userData }) => {
    const user = route.params.user;

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
                }}/>
            </View>
        )
    }
}

export default Main;