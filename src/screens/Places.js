import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import React, { useEffect, useState, useRef, use } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase, db, ref, get, onValue } from '../../config'
import { userId } from './main';

const Places = () => {
    const [placeName, setPlaceName] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState();
    const [adminControl, setAdminControl] = useState([]);
    const navigation = useNavigation();
    const height = Dimensions.get('screen').height;

    useEffect(() => {
        const dbref = ref(db, `places/`);
        const listener = onValue(dbref, (snapshot) => {
            var placeNameArray = [];
            var adminArray = [];
            var userArray = [];
            var adminControlArray = [];
            snapshot.forEach(element => {
                if (userId == element.key) {
                    element.forEach(element => {
                        const place = element.key;
                        placeNameArray.push(element.key);
                        setPlaceName(placeNameArray);
                        element.forEach(element => {
                            const value = element.val();
                            const key = element.key;
                            if (key == "users") {
                                userArray.push(value.user.length);
                                adminArray.push(value.admin.length);
                                setAdmins(adminArray);
                                setUsers(userArray);
                                for (let i = 0; i < value.admin.length; i++) {
                                    if (value.admin[i] == userId) {
                                        adminControlArray.push(place);
                                    }
                                }
                                setAdminControl(adminControlArray);
                            }
                        });
                    });
                }
            });
        });
        return () => listener();
    }, []);

    useEffect(() => {
        const data = [];
        try {
            for (let i = 0; i < placeName.length; i++) {
                data.push({ title: placeName[i], admins: admins[i], users: users[i] - 1 == 0 ? "yok" : users[i] - 1 });
            }
        } catch (error) {
            console.log(error);
        }
        setData(data);
    }, [placeName, admins, users]);

    const showAlert = (item) => {
        Alert.alert(
            "Emin misiniz?",
            "Seçilen mekanı silmek istediğinizden emin misiniz?",
            [
                {
                    text: "Evet",
                    onPress: () => deletePlace(item)
                },
                {
                    text: "Hayır"
                }
            ],
        );
    };

    function deletePlace(item) {
        console.log(item);
        firebase.database().ref(`places/${userId}/${item.title}`).remove().then(()=>{
            Alert.alert("Uyarı","Silmek istediğiniz mekan başarıyla silinmiştir");
        })
    }
    
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]} onPress={()=> {navigation.navigate('place',item.title)}}>
                <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 15 }}>
                    <Image source={require('../../assets/images/bina.jpg')} style={{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }} />
                </View>
                <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                            <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1 }} />
                            <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -13 }} />
                            <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -25 }} />
                        </View>
                        <View style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ textAlign: 'right' }} >Yönetici: {item.admins}</Text>
                            <Text style={{ textAlign: 'right' }}>Kullanıcı: {item.users}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItemAdmin = ({ item }) => {
        for (let i = 0; i < adminControl.length; i++) {
            if (adminControl[i] == item.title) {
                return (
                    <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]} onLongPress={() => { showAlert(item) }}>
                        <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 15 }}>
                            <Image source={require('../../assets/images/bina.jpg')} style={{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }} />
                        </View>
                        <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>{item.title}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -13 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -25 }} />
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right' }} >Yönetici: {item.admins}</Text>
                                    <Text style={{ textAlign: 'right' }}>Kullanıcı: {item.users}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }
        }

    }

    return (
        <SafeAreaView style={[styles.appContainer, { height: '100%' }]}>
            <Text style={styles.header}>Mekanlar</Text>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.statusContent}>
                    { /*<Text style={styles.emptyTitle}>Sana ait mekan yok.</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.header2}>Benim mekanlarım</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('addplace')}>
                            <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]}>
                        <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 15 }}>
                            <Image source={require('../../assets/images/okul.jpg')} style={{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }} />
                        </View>
                        <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>Pendik İTO Mesleki ve Teknik Anadolu Lisesi</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/images/denemexfci.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -13 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -25 }} />
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right' }} >Yönetici: 5</Text>
                                    <Text style={{ textAlign: 'right' }}>Cihaz: 10</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <FlatList data={data} renderItem={renderItem} scrollEnabled={false} />
                </View>
                <View style={styles.statusContent}>
                    { /*<Text style={styles.emptyTitle}>Yetkili olduğun mekan yok.</Text> */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.header2}>Yetkili olduğum mekanlar</Text>
                    </View>
                    <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]}>
                        <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 15 }}>
                            <Image source={require('../../assets/images/yunusemre.jpg')} style={{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }} />
                        </View>
                        <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>Yusuf Emre Mesleki ve Teknik Anadolu Lisesi</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -10 }} />
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right' }} >Yönetici: 2</Text>
                                    <Text style={{ textAlign: 'right' }}>Cihaz: 8</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <FlatList data={data} renderItem={renderItemAdmin} scrollEnabled={false} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Places