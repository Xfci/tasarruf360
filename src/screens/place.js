import { StyleSheet, Text, View, Image, ScrollView, Switch, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, AlertIOS, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase, db, ref, get, onValue, set } from '../../config'
import { fetchUserData } from '../scripts/fetchUserData';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import { SelectCountry } from 'react-native-element-dropdown';
const local_data = [
    {
        value: '1',
        lable: 'Yönetici',
        image: {
            uri: 'https://icons.iconarchive.com/icons/pictogrammers/material/256/crown-icon.png',
        },
    },
    {
        value: '2',
        lable: 'Kullanıcı',
        image: {
            uri: 'https://icons.iconarchive.com/icons/pictogrammers/material/256/account-icon.png',
        },
    },
    {
        value: '3',
        lable: 'Bekliyor...',
        image: {
            uri: 'https://icons.iconarchive.com/icons/pictogrammers/material/256/account-clock-outline-icon.png',
        },
    },
];




const Place = ({ route }) => {
    const placeName = route.params?.title;
    const type = route.params?.type;
    const userId = route.params?.id;
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [code, setCode] = useState();
    const [permision, setPermision] = useState();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [country, setCountry] = useState('1');


    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserData();
            setData(data);
        };
        getData();
    }, []);

    function control(value) {
        try {
            var a;
            for (let i = 0; i < value.users.jail?.length; i++) {
                console.log(i)
                if (userId == value.users.jail[i]) {
                    a = true;
                    setPermision("sınırlı erişim")
                }
            }
            for (let i = 0; i < value.users.user?.length; i++) {
                if (userId == value.users.user[i]) {
                    a = true;
                    setPermision("standart erişim")
                }
            }
            for (let i = 0; i < value.users.admin?.length; i++) {
                if (userId == value.users.admin[i]) {
                    a = true;
                    setPermision("yüksek erişim");
                }
            }
        } catch (error) {
        }
        return a;
    }

    useEffect(() => {
        if (type == "founder") {
            const dbref = ref(db, `places/${data[0]}/${placeName}/`);
            const listener = onValue(dbref, (snapshot) => {
                snapshot.forEach(element => {
                    const key = element.key;
                    const value = element.val();
                    if (key == "code") {
                        setCode(value);
                    }
                });
            });
            return () => listener();
        } else {
            var devam = true, devam2 = true;
            const dbref = ref(db, `places/`);
            const listener = onValue(dbref, (snapshot) => {
                snapshot.forEach(element => {
                    element.forEach(element => {
                        const key = element.key;
                        const value = element.val();
                        if (key == placeName) {
                            devam = control(value);
                            devam2 = true;
                            if (devam) {
                                setCode(value.code)
                            } else {
                                Alert.alert('Uyarı', 'İşlem yapmak istediğiniz mekan kurucu tarafından silinmiştir!')
                                navigation.replace("main");
                            }
                        } else {
                            devam2 = false;
                        }
                    });
                });
            });
            if (!devam2) {
                Alert.alert('Uyarı', 'İşlem yapmak istediğiniz mekan kurucu tarafından silinmiştir!')
                navigation.replace("main");
            }
            return () => listener();
        }

    }, [data]);


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView  style={{height:10}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity style={{ alignSelf: 'flex-start', marginLeft: 10 }} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="close" size={40} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/images/okul.jpg')} style={{ height: 120, width: 240, borderRadius: 20, marginBottom: 10 }} />
                    <Text style={styles.headerTitle}>{placeName}</Text>
                    <Text style={styles.macTitle}><MaterialCommunityIcons name="map-marker-outline" size={16} color="gray" /> Güzelyalı mah. Sahil blv. Pendik/İSTANBUL</Text>
                    <Text style={styles.macTitle}>Davet kodu: {code}</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.contentBlock}>
                        <View style={[styles.wrapper, { justifyContent: 'center' }]}>
                            <Text style={[styles.text]}>Cihazlar</Text>
                            <MaterialCommunityIcons name="developer-board" size={24} style={styles.icon} />
                        </View>

                        {/* CİHAZ YOKSA */}
                        <Text style={styles.emptyTitle}>Mekanda cihaz bulunamadı.</Text>
                        <Image source={require('../../assets/images/add-device.png')} style={{ height: 100, width: 120, alignSelf: 'center', margin: 10 }} />
                        <TouchableOpacity style={[styles.button, { marginBottom: 10, flexDirection: 'row' }]} onPress={() => navigation.navigate('step1')}>
                            <Text style={styles.appButtonText}>Cihaz Ekle </Text>
                            <MaterialCommunityIcons name="plus-circle" size={24} color={'white'} />
                        </TouchableOpacity>

                        {/* CİHAZ VARSA 
                        <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'black', padding: 10 }}>
                            <Text style={{fontSize:16,fontWeight:600}}>Kat ismi</Text>

                            İTEM

                        </View>
                        */}

                    </View>
                    <View style={styles.contentBlock}>
                        <View style={[styles.wrapper, { justifyContent: 'center' }]}>
                            <Text style={[styles.text]}>Mekan Ayarları </Text>
                            <MaterialCommunityIcons name="cog-outline" size={24} style={styles.icon} />
                        </View>



                        <View style={styles.wrapperAlt}>
                            <Text style={styles.text}>İsim</Text>
                            <View style={[styles.textInput, { marginTop: 5, width: '100%', paddingLeft: 20 }]}>
                                <TextInput value={placeName} style={{ flex: 1 }} />
                            </View>
                        </View>

                        <View style={styles.wrapperAlt}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text}>Konum</Text>
                                <MaterialCommunityIcons name="map-marker-outline" size={24} />
                            </View>
                            <View style={[styles.textInput, { marginTop: 5, width: '100%', paddingLeft: 20 }]}>
                                <TextInput value={'Güzelyalı mah. Sahil blv. Pendik/İSTANBUL'} style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => { selectLocation() }}>
                                    <MaterialCommunityIcons name="map-marker-account-outline" size={26} color="darkred" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.wrapperAlt}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.text}>Yeni kat ekle</Text>
                                <MaterialCommunityIcons name="home-modern" size={24} />
                            </View>
                            <View style={[styles.textInput, { marginTop: 5, width: '100%', paddingLeft: 20 }]}>
                                <TextInput placeholder='Zemin kat..' style={{ flex: 1 }} />
                                <TouchableOpacity onPress={() => { selectLocation() }}>
                                    <MaterialCommunityIcons name="plus-box" size={26} color="#0089ec" />
                                </TouchableOpacity>
                            </View>
                            
                        </View>



                        <View style={styles.wrapperAlt}>
                            <Text style={[styles.text, { marginBottom: 5 }]}>Kullancılar</Text>
                            <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'black', paddingBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: '#eee', borderRadius: 5, marginHorizontal: 10, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../assets/user.jpg')} style={{ width: 35, height: 35, borderRadius: '100%' }}></Image>
                                        <Text style={{ marginVertical: 'auto', marginHorizontal: 5 }}>ADMİN</Text>
                                    </View>

                                    <SelectCountry
                                        style={styles.dropdown}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        imageStyle={styles.imageStyle}
                                        iconStyle={styles.iconStyle}
                                        maxHeight={200}
                                        value={country}
                                        data={[{
                                            value: '1',
                                            lable: 'Kurucu',
                                            image: {
                                                uri: 'https://icons.iconarchive.com/icons/pictogrammers/material/256/crown-circle-icon.png',
                                            },
                                        }]}
                                        valueField="value"
                                        labelField="lable"
                                        imageField="image"
                                        placeholder="Select"
                                        searchPlaceholder="Search..."
                                        disable
                                        onChange={e => {
                                            setCountry(e.value);
                                        }}
                                    />

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, backgroundColor: '#eee', borderRadius: 5, marginHorizontal: 10, marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={require('../../assets/user.jpg')} style={{ width: 35, height: 35, borderRadius: '100%' }}></Image>
                                        <Text style={{ marginVertical: 'auto', marginHorizontal: 5 }}>Kenan</Text>
                                    </View>
                                    <SelectCountry
                                        style={styles.dropdown}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        placeholderStyle={styles.placeholderStyle}
                                        imageStyle={styles.imageStyle}
                                        iconStyle={styles.iconStyle}
                                        maxHeight={200}
                                        value={country}
                                        data={local_data}
                                        valueField="value"
                                        labelField="lable"
                                        imageField="image"
                                        placeholder="Select"
                                        searchPlaceholder="Search..."
                                        onChange={e => {
                                            setCountry(e.value);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonSave} onPress={null}>
                            <View style={styles.wrapperNone}>
                                <Text style={styles.buttonText}>Kaydet</Text>
                                <MaterialCommunityIcons name="content-save" color={'#fff'} size={20} style={styles.icon} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.wrapper, { justifyContent: '' }]} onPress={() => closeAlert()}>
                            <MaterialCommunityIcons name="delete-outline" color={'#e60000'} size={24} style={styles.icon} />
                            <Text style={[styles.text, { color: '#e60000' }]}> Mekanı Sil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <StatusBar barStyle={'dark-content'} />
        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        maxWidth: 1000,
        alignSelf: 'center'
    },
    header: {
        gap: 4,
        height: 350,
        backgroundColor: '#95c2d1',
        borderBottomLeftRadius: '20%',
        borderBottomRightRadius: '20%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    macTitle: {
        color: 'gray'
    },
    content: {
        padding: 10
    },
    contentBlock: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 25,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30,
        maxWidth: 600,
        alignSelf: 'center'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    wrapperAlt: {
        padding: 20
    },
    wrapperNone: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '700'
    },
    textInput: {
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,

    },
    buttonSave: {
        width: 100,
        backgroundColor: '#0089ec',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 20
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600'
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 5,
        borderColor: '#f1f1f1',
        borderWidth: 2,
        padding: 10,

    },
    itemIcon: {
        flex: 1,
    },
    itemContent: {
        flex: 4,
        justifyContent: 'space-around'
    },
    itemHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dropdown: {
        marginVertical: 'auto',
        height: 30,
        width: 150,
        backgroundColor: 'white',
        borderRadius: 22,
        paddingHorizontal: 8,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    emptyTitle: {
        color: 'gray',
        textAlign: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#0089ec',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    appButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})

export default Place