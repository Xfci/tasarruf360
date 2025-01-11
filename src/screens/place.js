import { Text, SafeAreaView, StatusBar, InputAccessoryView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase, db, ref, get, onValue, set } from '../../config'
import { fetchUserData } from '../scripts/fetchUserData';
import { styles } from '../../style';

const Place = ({ route }) => {
    const placeName = route.params.title;
    const type = route.params.type;
    const [data, setData] = useState([]);
    const [code, setCode] = useState();

    useEffect(() => {
        const getData = async () => {
            const data = await fetchUserData();
            setData(data);
        };
        getData();
    }, []);

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
            const dbref = ref(db, `places/`);
            const listener = onValue(dbref, (snapshot) => {
                snapshot.forEach(element => {
                    element.forEach(element => {
                        const key = element.key;
                        const value = element.val();
                        if (key == placeName) {
                            setCode(value.code)
                        }
                    });
                });
            });
            return () => listener();
        }

    }, [data]);

    return (
        <SafeAreaView style={[styles.appContainer, { height: '100%' }]}>
            <Text style={styles.header}>{placeName}</Text>
            <Text style={styles.header}>Davet kodu: {code}</Text>
            <StatusBar barStyle={'dark-content'} />
        </SafeAreaView>
    )
}

export default Place