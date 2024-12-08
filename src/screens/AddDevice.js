import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View,Image,StatusBar } from 'react-native'

import Swiper from 'react-native-swiper'


const AddDevice = ({navigation}) => {
    return (
        <Swiper style={styles.wrapper}>
            <View style={styles.slide1}>
                <Image source={require('../../assets/images/led.gif')} style={{height:200,width:300,flex:3}}/>
                <Text style={styles.text}>Cihazın üzerindeki kırmızı ışığın yanıp söndüğüne emin oldun.</Text>
                <Text style={styles.description}>Yanıp sönmüyorsa reset tuşuna uzun süre basılı tutun.</Text>
            </View>
            <View style={styles.slide1}>
                <Image source={require('../../assets/images/led.gif')} style={{height:200,width:300,flex:3}}/>
                <Text style={styles.text}>Cihazın üzerindeki kırmızı ışığın yanıp söndüğüne emin oldun.</Text>
                <Text style={styles.description}>Yanıp sönmüyorsa reset tuşuna uzun süre basılı tutun.</Text>
            </View>
            <View style={styles.slide1}>
                <Image source={require('../../assets/images/led.gif')} style={{height:200,width:300,flex:3}}/>
                <Text style={styles.text}>Cihazın üzerindeki kırmızı ışığın yanıp söndüğüne emin oldun.</Text>
                <Text style={styles.description}>Yanıp sönmüyorsa reset tuşuna uzun süre basılı tutun.</Text>
            </View>
        </Swiper>
        
    )
}


const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
        flex:3
    },
    description: {
        color: 'gray',
        fontSize: 10,
        textAlign:'center',
        flex:1
    }
})

export default AddDevice