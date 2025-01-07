import { Image, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native'
import { styles } from '../../style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { type } from './main';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchUserData } from '../scripts/fetchUserData';

const Profile = ({ user }) => {
    const [settingType, setSettingType] = useState('');
    const [data, setData] = useState([]);
    const navigation = useNavigation();
    const height = Dimensions.get('screen').height;

    const selectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    useEffect(() => {
        const getData = async () => {
            const id = await fetchUserData();
            setData(id);
        }
        getData();
    }, []);

    async function deleteUser() {
        await AsyncStorage.removeItem('@user');
        await AsyncStorage.removeItem('@userData');
        await AsyncStorage.removeItem('@kullanici').then(() => {
            navigation.replace('login');
        });
    }


    const Sub = () => {
        return (
            <ScrollView style={[styles.appContainer, { height: height / 1.45, paddingHorizontal: 10 }]}>
                <View style={styles.plan}>
                    <View style={styles.activePlan}>
                        <Text style={{ color: '#ebb734', fontWeight: 500 }}>Aktif Plan</Text>
                    </View>
                    <View style={styles.planHeader}>
                        <Text style={styles.planHeaderText}>Kişisel</Text>
                    </View>
                    <Text style={[styles.planHeaderText, { color: '#0084e0' }]}>Bedava</Text>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>Sınırsız cihaz ekleme hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>1 mekan yönetim hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>1 mekan ekleme hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="close" size={25} color="red" style={styles.icon} />
                            <Text style={{}}>Paylaşımsız kullanım.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="close" size={25} color="red" style={styles.icon} />
                            <Text style={{}}>Reklamlı uygulama.</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.plan, { borderColor: '#dba904' }]}>
                    <View style={[styles.planHeader, { backgroundColor: '#f2bd11' }]}>
                        <Text style={[styles.planHeaderText, {}]}>Aile Paketi</Text>
                    </View>
                    <Text style={[styles.planHeaderText, { color: '#dba904' }]}>59 TL</Text>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>Sınırsız cihaz ekleme hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>1 mekan yönetim hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>1 mekan ekleme hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>1 mekan paylaşma hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="close" size={25} color="red" style={styles.icon} />
                            <Text style={{}}>Reklamlı uygulama.</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.buttonOutline, { width: '70%', borderColor: '#f2bd11', marginBottom: 20, flexDirection: 'row' }]}>
                        <Text style={{ color: '#f2bd11', fontSize: 16, fontWeight: '600' }}>Plana Geçiş Yap</Text>
                        <MaterialCommunityIcons name="greater-than" size={20} color="#f2bd11" />
                    </TouchableOpacity>
                </View>

                <View style={[styles.plan, { borderColor: '#01a600' }]}>
                    <View style={[styles.planHeader, { backgroundColor: '#01c800' }]}>
                        <Text style={[styles.planHeaderText]}>Kurumsal</Text>
                    </View>
                    <Text style={[styles.planHeaderText, { color: '#01a600' }]}>129 TL</Text>
                    <View style={{ marginBottom: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>Sınırsız cihaz ekleme hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>Sınırsız mekan yönetim hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>5 mekan ekleme hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>Mekan paylaşma hakkı.</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                            <Text style={{}}>Reklamsız uygulama.</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.buttonOutline, { width: '70%', borderColor: '#01c800', marginBottom: 20, flexDirection: 'row' }]}>
                        <Text style={{ color: '#01c800', fontSize: 16, fontWeight: '600' }}>Plana Geçiş Yap</Text>
                        <MaterialCommunityIcons name="greater-than" size={20} color="#01c800" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.buttonOutline, { width: '100%', borderColor: '#01c800', marginBottom: 20, flexDirection: 'row' }]} onPress={() => setSettingType('')}>
                    <Text style={{ color: '#01c800', fontSize: 16, fontWeight: '600' }}>Ayarlara Dön</Text>
                    <MaterialCommunityIcons name="greater-than" size={20} color="#01c800" />
                </TouchableOpacity>
            </ScrollView>
        )
    }

    if (data[1] == "google") {
        return (
            <SafeAreaView style={[styles.appContainer, { backgroundColor: '#eee' }]}>
                <ScrollView>
                    <Text style={[styles.header, { marginBottom: 0 }]}>Ayarlar</Text>
                    <View style={styles.porfileContainer}>
                        <View style={[styles.part, { flex: 0.75 }]}>
                            <Image style={{ width: 100, height: 100, borderRadius: 100, alignSelf: 'center' }} source={{ uri: data[3] }}></Image>
                        </View>
                        <View style={styles.part}>
                            <Text style={styles.profileText}>
                                Merhaba,
                            </Text>
                            <Text style={styles.profileName}>
                                {data[2]}
                            </Text>
                        </View>
                        <View style={[styles.part, [styles.part, { flex: 0.5 }]]}>
                            <TouchableOpacity style={styles.editButton} onPress={() => setSettingType(settingType == 'edit' ? '' : 'edit')}>
                                {
                                    settingType == 'edit'
                                        ? <MaterialCommunityIcons name="close" size={30} color="red" style={{ alignSelf: 'center' }} />
                                        : <MaterialCommunityIcons name="pencil" size={30} color="#fff" style={{ alignSelf: 'center' }} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileContent}>
                        {
                            settingType == '' ?
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
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5 }]} onPress={() => setSettingType(settingType == '' ? 'sub' : '')}>
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
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5, borderBottomWidth: 11 }]} onPress={() => { deleteUser() }}>
                                        <Text style={{ color: 'red', fontSize: 16 }} >Oturumu kapat</Text>
                                    </TouchableOpacity>
                                </View> :
                                settingType == 'sub' ?
                                    <Sub /> : settingType == 'edit' ? <Text>edit</Text> : null
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    } else if (data[1] == "eposta") {
        return (
            <SafeAreaView style={[styles.appContainer, { backgroundColor: '#eee' }]}>
                <ScrollView>
                    <Text style={[styles.header, { marginBottom: 0 }]}>Ayarlar</Text>
                    <View style={styles.porfileContainer}>
                        <View style={[styles.part, { flex: 0.75 }]}>
                            <Image style={{ width: 100, height: 100, borderRadius: 100, alignSelf: 'center' }} source={require('../../assets/user.jpg')}></Image>
                        </View>
                        <View style={styles.part}>
                            <Text style={styles.profileText}>
                                Merhaba,
                            </Text>
                            <Text style={styles.profileName}>
                                {data[2]}
                            </Text>
                        </View>
                        <View style={[styles.part, [styles.part, { flex: 0.5 }]]}>
                            <TouchableOpacity style={styles.editButton} onPress={() => setSettingType(settingType == 'edit' ? '' : 'edit')}>
                                {
                                    settingType == 'edit'
                                        ? <MaterialCommunityIcons name="close" size={30} color="red" style={{ alignSelf: 'center' }} />
                                        : <MaterialCommunityIcons name="pencil" size={30} color="#fff" style={{ alignSelf: 'center' }} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileContent}>
                        {
                            settingType == '' ?
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
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5 }]} onPress={() => setSettingType(settingType == '' ? 'sub' : '')}>
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
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5, borderBottomWidth: 11 }]} onPress={() => { deleteUser() }}>
                                        <Text style={{ color: 'red', fontSize: 16 }} >Oturumu kapat</Text>
                                    </TouchableOpacity>
                                </View> :
                                settingType == 'sub' ?
                                    <Sub /> : settingType == 'edit' ? <Text>edit</Text> : null
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    } else if (data[1] == "kullanici") {
        return (
            <SafeAreaView style={[styles.appContainer, { backgroundColor: '#eee' }]}>
                <ScrollView>
                    <Text style={[styles.header, { marginBottom: 0 }]}>Ayarlar</Text>
                    <View style={styles.porfileContainer}>
                        <View style={[styles.part, { flex: 0.75 }]}>
                            <Image style={{ width: 100, height: 100, borderRadius: 100, alignSelf: 'center' }} source={require('../../assets/user.jpg')}></Image>
                        </View>
                        <View style={styles.part}>
                            <Text style={styles.profileText}>
                                Merhaba,
                            </Text>
                            <Text style={styles.profileName}>
                                {data[0]}
                            </Text>
                        </View>
                        <View style={[styles.part, [styles.part, { flex: 0.5 }]]}>
                            <TouchableOpacity style={styles.editButton} onPress={() => setSettingType(settingType == 'edit' ? '' : 'edit')}>
                                {
                                    settingType == 'edit'
                                        ? <MaterialCommunityIcons name="close" size={30} color="red" style={{ alignSelf: 'center' }} />
                                        : <MaterialCommunityIcons name="pencil" size={30} color="#fff" style={{ alignSelf: 'center' }} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileContent}>
                        {
                            settingType == '' ?
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
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5 }]} onPress={() => setSettingType(settingType == '' ? 'sub' : '')}>
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
                                    <TouchableOpacity style={[styles.profileButton, { borderTopWidth: 5, borderBottomWidth: 11 }]} onPress={() => { deleteUser() }}>
                                        <Text style={{ color: 'red', fontSize: 16 }} >Oturumu kapat</Text>
                                    </TouchableOpacity>
                                </View> :
                                settingType == 'sub' ?
                                    <Sub /> : settingType == 'edit' ? <Text>edit</Text> : null
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default Profile;