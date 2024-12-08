import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-web'

export default function Device() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/images/electrical-panel.png')} style={{ height: 24, width: 24 }} />
                <Text>Elektrik sayacı</Text>
            </View>
            <View style={styles.content}>
                <Image source={require('../../assets/images/electrical-panel.png')} style={{ height: 24, width: 24 }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header: {
        flex: 1,
        backgroundColor: '#fff',
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 30,
        justifyContent:'center',
        alignItems:'center'
    },
    content:{
        flex:1,
    }
})