import { StyleSheet, Text, View } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { firebase, db, ref, get, onValue, set } from '../../config'
import { fetchUserData } from '../scripts/fetchUserData';

const Place = ({ route }) => {
    const placeName = route.params;
    const [uid,setUID] = useState();

    useEffect(() => {
        const getData = async () => {
            const id = await fetchUserData();
            setUID(id);
        };
        getData();
    }, []);

    return (
        <View>
            <Text>Place {uid}</Text>
        </View>
    )
}

export default Place

const styles = StyleSheet.create({})