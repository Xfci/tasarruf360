import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, Alert, StatusBar, StyleSheet, TextInput, ActivityIndicator } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import React, { useEffect, useState, useRef, use } from 'react'
import { useNavigation } from '@react-navigation/native';
import { firebase, db, ref, get, onValue } from '../../config'
import { fetchUserData } from '../scripts/fetchUserData';


const Places = () => {
    const [placeName, setPlaceName] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [users, setUsers] = useState([]);
    const [data, setData] = useState();
    const [adminControl, setAdminControl] = useState([]);
    const navigation = useNavigation();
    const height = Dimensions.get('screen').height;
    const [userData, setUserData] = useState([]);
    const [invitation, setInvitation] = useState(false);
    const [code, setCode] = useState();
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(true);

    const [joinedData, setJoinedData] = useState([]);
    const [joinedAdmin, setJoinedAdmin] = useState([]);
    const [joinedAdminGet, setJoinedAdminGet] = useState([]);
    const [joinedUser, setJoinedUser] = useState([]);
    const [joinedPlace, setJoinedPlace] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserData();
            setUserData(data)
        }
        getData();
    }, []);

    useEffect(() => {
        setUserId(userData[0]);
    }, [userData])

    useEffect(() => {
        const dbref = ref(db, `places/`);
        const listener = onValue(dbref, (snapshot) => {
            var placeNameArray = [];
            var adminArray = [];
            var userArray = [];
            var joinedAdminArray = [];
            var joinedPlaceArray = [];
            snapshot.forEach(element => {
                if (userId == element.key) {
                    element.forEach(element => {
                        const place = element.key;
                        if (place != 'joined') {
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
                                }
                            });
                        } else {
                            element.forEach(element => {
                                const value = element.val();
                                joinedAdminArray.push(value.admin);
                                joinedPlaceArray.push(value.placeName);
                                setJoinedAdmin(joinedAdminArray);
                                setJoinedPlace(joinedPlaceArray);
                            });
                        }
                    });
                }
            });
        });
        return () => listener();
    }, [userData, userId]);

    useEffect(() => {
        var joinedAdminArray = [];
        var joinedUserArray = [];
        var durum;
        for (let i = 0; i < joinedAdmin.length; i++) {
            const dbref = ref(db, `places/${joinedAdmin[i]}/${joinedPlace[i]}`);
            const listener = onValue(dbref, (snapshot) => {
                snapshot.forEach(element => {
                    const key = element.key;
                    if (key == 'users') {
                        element.forEach(element => {
                            const value = element.val();
                            for (let i = 0; i < value.length; i++) {
                                if (userId == value[i]) {
                                    durum = true;
                                }
                            }
                        });
                    }
                });
                if (durum) {
                    snapshot.forEach(element => {
                        const key = element.key;
                        if (key == 'users') {
                            element.forEach(element => {
                                const key = element.key;
                                const value = element.val();
                                if (key == 'admin') {
                                    joinedAdminArray.push(value.length);
                                } else if (key == 'user') {
                                    joinedUserArray.push(value.length);
                                }
                            });
                        }
                        setJoinedAdminGet(joinedAdminArray);
                        setJoinedUser(joinedUserArray);
                    });
                } else {
                    setJoinedAdminGet();
                    setJoinedUser();
                    joinedPlace[i] = '';
                }
                return () => listener();
            });
        }
    }, [joinedAdmin, joinedPlace]);

    useEffect(() => {
        try {
            const data = [];
            for (let i = 0; i < joinedPlace.length; i++) {
                if (joinedPlace[i] != '') {
                    data.push({ title: joinedPlace[i], admins: joinedAdminGet[i] - 1 == 0 ? 'yok' : joinedAdmin[i] - 1, users: joinedUser[i] - 1 == 0 ? "yok" : joinedUser[i] - 1 });
                }
            }
            setJoinedData(data);
        } catch (error) {
            console.log(error)
        }
    }, [joinedAdminGet, joinedUser]);

    useEffect(() => {
        const data = [];
        try {
            for (let i = 0; i < placeName.length; i++) {
                data.push({ title: placeName[i], admins: admins[i] - 1 == 0 ? 'yok' : admins[i] - 1, users: users[i] - 1 == 0 ? "yok" : users[i] - 1 });
            }
        } catch (error) {
            console.log(error);
        }
        setData(data);
        setLoading(false);
    }, [placeName, admins, users, userData, userId]);

    const showAlertDelete = (item) => {
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

    async function control() {
        const dbref = ref(db, `places/${userId}/`);
        const snapshot = await get(dbref);
        if (snapshot.val() == null) {
            setData();
            setPlaceName();
            setAdmins();
            setUsers();
            setAdminControl();
        }
    }

    function deletePlace(item) {
        firebase.database().ref(`places/${userId}/${item.title}`).remove().then(() => {
            control();
            Alert.alert("Uyarı", "Silmek istediğiniz mekan başarıyla silinmiştir");
        })
    }

    async function dbJoin(placeName) {
        var path, id = 0, devam = true, addmin, place, idUser = 0;
        if (placeName != undefined) {
            const dbref = ref(db, 'places/');
            const snapshot = await get(dbref);
            snapshot.forEach(element => {
                const admin = element.key;
                console.log(admin)
                element.forEach(element => {
                    const key = element.key;
                    const value = element.val();
                    if (placeName == key) {
                        path = `places/${admin}/${placeName}/users/jail/`;
                        addmin = admin;
                        place = key;
                        if (value.users.jail != undefined) {
                            id = element.val().users.jail.length;
                            for (let i = 0; i < id; i++) {
                                if (userId == element.val().users.jail[i]) {
                                    devam = false;
                                }
                            }
                        }
                        element.forEach(element => {
                            id = 0;
                            if (element.key == 'users') {
                                element.forEach(element => {
                                    if (element.key == 'jail') {
                                        element.forEach(element => {
                                            id = parseInt(element.key) + 1;
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        } else {
            const dbref = ref(db, 'places/');
            const snapshot = await get(dbref);
            snapshot.forEach(element => {
                const admin = element.key;
                element.forEach(element => {
                    const key = element.key;
                    const value = element.val();
                    if (code == value.code) {
                        path = `places/${admin}/${key}/users/jail/`;
                        addmin = admin;
                        place = key;
                        if (value.users.jail != undefined) {
                            id = element.val().users.jail.length;
                            for (let i = 0; i < id; i++) {
                                if (userId == element.val().users.jail[i]) {
                                    devam = false;
                                }
                            }
                        }
                        element.forEach(element => {
                            id = 0;
                            if (element.key == 'users') {
                                element.forEach(element => {
                                    if (element.key == 'jail') {
                                        element.forEach(element => {
                                            id = parseInt(element.key) + 1;
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            });
        }

        const dbref = ref(db, `places/${userId}/joined/`);
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            idUser = parseInt(element.key) + 1;
        });

        if (devam) {
            await firebase.database().ref(path + id).set((
                userId
            ));
            await firebase.database().ref(`places/${userId}/joined/${idUser}`).set({
                admin: addmin,
                placeName: place
            });
            Alert.alert('Uyarı', 'Davet kodu ile mekana kayıt yaptınız (yetkiniz sınırlıdır,mekanın yöneticilerinden biri yetkinizi ayarlayana kadar bu mekan içindeki cihazlar hakkında bilgi alamayacaksınız)!');
            setCode();
            setInvitation();
        } else {
            Alert.alert('Uyarı', 'Girmek istediğiniz mekanda zaten kaydınız bulunuyor!');
        }
    }

    async function joinPlace() {
        var devam = true;
        const dbref = ref(db, 'places/');
        const snapshot = await get(dbref);
        snapshot.forEach(element => {
            element.forEach(element => {
                const controlCode = element.val().code;
                const controlPlaceName = element.key;
                if (placeName[0] == undefined) {
                    if (code == controlCode) {
                        dbJoin();
                    }
                } else {
                    for (let i = 0; i < placeName.length; i++) {
                        if (placeName[i] == controlPlaceName) {
                            if (code == controlCode) {
                                devam = false;
                                Alert.alert('Uyarı', 'Girmek istediğiniz mekanda zaten kaydınız bulunuyor!');
                            }
                        } else if (devam) {
                            if (placeName[i] != controlPlaceName) {
                                if (code == controlCode) {
                                    dbJoin(controlPlaceName);
                                }
                            } else {
                                Alert.alert('Uyarı', 'girmiş olduğunuz davet kodu hatalı veya eksik olabilir!');
                            }
                        }
                    }
                }
            });
        });
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]} onPress={() => { navigation.navigate('place', item.title) }} onLongPress={() => showAlertDelete(item)}>
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
                            <Text style={{ textAlign: 'right' }}>Kurucu: 1</Text>
                            <Text style={{ textAlign: 'right' }}>Yönetici: {item.admins}</Text>
                            <Text style={{ textAlign: 'right' }}>Kullanıcı: {item.users}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItemInvited = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]} onPress={() => { navigation.navigate('place', item.title) }}>
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
                            <Text style={{ textAlign: 'right' }}>Kurucu: 1</Text>
                            <Text style={{ textAlign: 'right' }}>Yönetici: {item.admins}</Text>
                            <Text style={{ textAlign: 'right' }}>Kullanıcı: {item.users}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    if (loading || data == undefined) {
        return (
            <SafeAreaView style={[styles.appContainer, { height: '100%' }]}>
                <Text style={styles.header}>Mekanlar</Text>
                <View style={{ flex: 1 }}>
                    <ActivityIndicator size={'large'} color={'black'} />
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={[styles.appContainer, { height: '100%' }]}>
            <Text style={styles.header}>Mekanlar</Text>
            {
                !invitation ?
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={styles.statusContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.header2}>Benim mekanlarım</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('addplace')}>
                                    <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                                </TouchableOpacity>
                            </View>
                            <FlatList data={data} renderItem={renderItem} scrollEnabled={false} />
                        </View>
                        <View style={styles.statusContent}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.header2}>Katılmış olduğum mekanlar</Text>
                                <TouchableOpacity onPress={() => setInvitation(true)}>
                                    <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                                </TouchableOpacity>
                            </View>
                            <FlatList data={joinedData} renderItem={renderItemInvited} scrollEnabled={false} />
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.statusContent}>
                        <Text>Davet Kodu</Text>
                        <View style={style.inputContainer}>
                            <TextInput style={style.textInput} placeholder='Davet Kodu' value={code} onChangeText={(value) => setCode(value)} />
                        </View>
                        <TouchableOpacity style={style.button} onPress={() => { joinPlace() }}>
                            <Text style={style.buttonText}>Davet Kodu İle Mekana Katıl</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.button} onPress={() => { setInvitation(false) }}>
                            <Text style={style.buttonText}>İptal</Text>
                        </TouchableOpacity>
                    </View>
            }
            <StatusBar barStyle={'dark-content'} />
        </SafeAreaView>
    )
}


const style = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        marginBottom: 10
    },
    textInput: {
        flex: 1, // Esneklik veriyoruz, TextInput geniş alanı kaplar
        fontSize: 16,
        paddingVertical: 15,
    },
    inputs: {
        flex: 2,
        gap: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#f2bd11',
        borderRadius: 15,
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
})


/*
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


                            element.forEach(element => {
                            if (element.key == 'users') {
                                element.forEach(element => {
                                    if (element.key == 'user') {
                                        element.forEach(element => {
                                            console.log(element.key)
                                            id = parseInt(element.key) + 1;
                                        });
                                    }
                                });
                            }
                        });
                            */

export default Places