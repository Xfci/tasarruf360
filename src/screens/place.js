import { Text, SafeAreaView, StatusBar, InputAccessoryView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, get, onValue, set } from '../../config'
import { fetchUserData } from '../scripts/fetchUserData';
import { styles } from '../../style';
import { useNavigation } from '@react-navigation/native';

const Place = ({ route }) => {
    const placeName = route.params?.title;
    const type = route.params?.type;
    const userId = route.params?.id;
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [code, setCode] = useState();
    const [permision, setPermision] = useState();

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
        <SafeAreaView style={[styles.appContainer, { height: '100%' }]}>
            <Text style={styles.header}>{placeName}</Text>
            <Text style={styles.header}>Davet kodu: {code}</Text>
            <Text style={styles.header}>Erişim: {permision}</Text>
            <StatusBar barStyle={'dark-content'} />
        </SafeAreaView>
    )
}

export default Place