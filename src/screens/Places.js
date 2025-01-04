import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native'
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
    const [location, setLocation] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [devices, setDevices] = useState([]);
    const [data, setData] = useState();
    const navigation = useNavigation();
    const height = Dimensions.get('screen').height;

    useEffect(() => {
        const dbref = ref(db, `places/`);
        const listener = onValue(dbref, (snapshot) => {
            var placeNameArray = [];
            var locationArray = [];
            snapshot.forEach(element => {
                if (userId == element.key) {
                    element.forEach(element => {
                        placeNameArray.push(element.key);
                        locationArray.push(element.val().konum);
                        setPlaceName(placeNameArray);
                        setLocation(locationArray);
                    });
                }
            });
        });
        return () => listener();
    }, []);

    useEffect(() => {
        var adminArray = [];
        var userArray = [];
        setAdmins('');
        setUsers('');
        const dbref = ref(db, `places/`);
        const listener = onValue(dbref, (snapshot) => {
            snapshot.forEach(element => {
                element.forEach(element => {
                    element.forEach(element => {
                        const key = element.key;
                        const value = element.val();
                        if (key == "users") {
                            adminArray.push(value.admin?.length);
                            userArray.push(value.user?.length);
                            setAdmins(adminArray);
                            setUsers(userArray);
                        }
                    });
                });
            });
        });
        return () => listener();
    }, [placeName]);

    useEffect(() => {
        const data = [];
        for (let i = 0; i < placeName.length; i++) {
            data.push({ title: placeName[i], location: location[i] ? location[i] : "yok", admins: admins[i] ? admins[i] : "yok", users: users[i] ? users[i] : "yok" });
        }
        setData(data);
    }, [placeName, location, admins, users]);

    function yaz() {
        console.log(data);
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]}>
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

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.header}>Mekanlar</Text>
            <ScrollView>
                <View style={[styles.statusContent, { height: height / 3 }]}>
                    { /*<Text style={styles.emptyTitle}>Sana ait mekan yok.</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.header2}>Benim mekanlarım</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('addplace')}>
                            <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
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
                    </ScrollView>
                </View>
                <View style={styles.statusContent}>
                    { /*<Text style={styles.emptyTitle}>Yetkili olduğun mekan yok.</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.header2}>Yetkili olduğun mekanlar</Text>
                        <TouchableOpacity onPress={() => yaz()}>
                            <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                        </TouchableOpacity>
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
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Places