import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { userId } from './main';
import { firebase, db, ref, get, onValue } from '../../config'

const Place = ({ route }) => {
    const placeName = route.params;
    const userId = userId;

    return (
        <View>
            <Text>Place</Text>
        </View>
    )
}

export default Place

const styles = StyleSheet.create({})