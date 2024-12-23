import { Image, Text, View, Button, TouchableOpacity } from 'react-native'
import { styles } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type } from './main';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({ user }) => {
    const [showEditing, setShowEditing] = useState(false);
    const navigation = useNavigation();

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    if (type == "google") {
        return (
            <View style={styles.appContainer}>
                <View style={styles.porfileContainer}>
                    <Image style={{ width: 100, height: 100, marginRight: 20, borderRadius: 100 }} source={{ uri: user.user.picture }} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', borderWidth: 2, borderColor: "black", padding: 20, marginBottom: 10, borderRadius: 15 }}>
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
            <SafeAreaView style={[styles.appContainer, { backgroundColor: '#eee' }]}>
                <ScrollView>
                <Text style={[styles.header, { marginBottom: 0 }]}>Ayarlar</Text>
                    <View style={styles.porfileContainer}>
                        <View style={[styles.part, { flex: 0.75 }]}>
                            <Image style={{ width: 100, height: 100, borderRadius: '100%', alignSelf: 'center' }} source={require('../../assets/user.jpg')}></Image>
                        </View>
                        <View style={styles.part}>
                            <Text style={styles.profileText}>
                                Merhaba,
                            </Text>
                            <Text style={styles.profileName}>
                                {user.user}
                            </Text>
                        </View>
                        <View style={[styles.part, [styles.part, { flex: 0.5 }]]}>
                            <TouchableOpacity style={styles.editButton} onPress={() => setShowEditing(!showEditing)}>
                                {
                                    !showEditing
                                        ? <MaterialCommunityIcons name="pencil" size={30} color="#fff" style={{ alignSelf: 'center' }} />
                                        : <MaterialCommunityIcons name="close" size={30} color="red" style={{ alignSelf: 'center' }} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileContent}>
                        {
                            !showEditing ?
                                <View>
                                    <TouchableOpacity style={[styles.profileButton, , { paddingTop: 0 }]}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="key-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>İzinler</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.profileButton}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="lock-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Gizlilik</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.profileButton}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="bell-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Bildirimler</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.profileButton}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="link-variant" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Bağlantılar</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="google" size={16} color="" style={{ borderWidth: 1, borderRadius: 5, padding: 2, marginRight: 5 }} />
                                            <MaterialCommunityIcons name="apple" size={16} color="black" style={{ borderWidth: 1, borderRadius: 5, padding: 2, marginRight: 5 }} />
                                            <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5 }]} onPress={() => navigation.navigate('subscription')}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="crown-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Abonelikler</Text>
                                        </View>
                                        <View style={styles.row}>
                                            <Text style={{ borderWidth: 1, borderRadius: 5, padding: 2, marginRight: 5, fontSize: 10 }} >Kişisel</Text>
                                            <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.profileButton}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="book-open-page-variant-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Haklarım</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5 }]}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="shopping-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Cihaz satın al</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.profileButton}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="hand-heart-outline" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Bağış yap</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.profileButton}>
                                        <View style={styles.row}>
                                            <MaterialCommunityIcons name="headset" size={20} color="black" style={styles.icon} />
                                            <Text style={styles.profileButtonText}>Destek</Text>
                                        </View>
                                        <MaterialCommunityIcons name="greater-than" size={20} color="#eee" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5,borderBottomWidth:11 }]} onPress={async () => {
                                        await AsyncStorage.removeItem("@kullanici");
                                        navigation.replace("login");
                                    }}>
                                        <Text style={{ color: 'red', fontSize: 16 }} >Oturumu kapat</Text>
                                    </TouchableOpacity>
                                </View>
                                : <Text>EDİTİNG</Text> // buraya edit ekranı gelicek
                        }
                    </View>
                    </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Profile;