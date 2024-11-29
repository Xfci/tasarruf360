import { Image, Text, View, Button } from 'react-native'
import { styles } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type } from './main';
import { useNavigation } from '@react-navigation/native';
import { EvilIcons } from 'react-native-vector-icons/';

const Profile = ({ user }) => {
    const navigation = useNavigation();

    if (type == "google") {
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 2, borderColor: "black", padding: 20, marginBottom: 10, borderRadius: 15 }}>
                    <Image style={{ width: 100, height: 100, marginRight: 20, borderRadius: 100 }} source={{ uri: user.user.picture }} />
                    <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                        <Text>
                            E-MAİL : {user.user.email}
                        </Text>
                        <Text>
                            Ad : {user.user.given_name}
                        </Text>
                        <Text>
                            Soyad : {user.user.family_name}
                        </Text>
                        <Text>
                            Google Id : {user.user.id}
                        </Text>
                    </View>
                </View>
                <Button title='Oturumu Kapat' onPress={async () => {
                    await AsyncStorage.removeItem("@user");
                    navigation.replace('login');
                }} />
            </View>
        )
    } else if (type == "eposta") {
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 2, borderColor: "black", padding: 20, marginBottom: 10, borderRadius: 15 }}>
                    <EvilIcons style={{ width: 100, height: 100, borderRadius: 100 }} name="user" size={100} color="black" />
                    <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                        <Text>
                            E-MAİL : {user.userData.email}
                        </Text>
                    </View>
                </View>
                <Button
                    title='Oturumu kapat'
                    onPress={async () => {
                        await AsyncStorage.removeItem("@userData");
                        navigation.replace("login");
                    }}
                />
            </View>
        )
    } else {
        return (
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 2, borderColor: "black", padding: 20, marginBottom: 10, borderRadius: 15 }}>
                    <EvilIcons style={{ width: 100, height: 100, borderRadius: 100 }} name="user" size={100} color="black" />
                    <View style={{ flexDirection: "column", justifyContent: "space-around" }}>
                        <Text>
                            Kullanıcı Adı : {user.user}
                        </Text>
                    </View>
                </View>
                <Button
                    title='Oturumu kapat'
                    onPress={async () => {
                        await AsyncStorage.removeItem("@kullanici");
                        navigation.replace("login");
                    }}
                />
            </View>
        )
    }
}

export default Profile;