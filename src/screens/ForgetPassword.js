import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import { styles } from '../../style'
import React from 'react'

const ForgetPassword = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/banner3.jpeg')} style={styles.banner3} />
            <View style={styles.formContainer}>
                <Text style={styles.header}>Şifre Sıfırlama</Text>
                <TextInput style={styles.input} placeholder='e-mail' autoComplete='email' inputMode='email' />
            </View>
            <StatusBar barStyle={'dark-content'}/>
        </View>
    )
}

export default ForgetPassword