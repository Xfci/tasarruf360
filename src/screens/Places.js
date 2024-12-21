import { View, Text, Image, TouchableOpacity } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react'

const Places = () => {
    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.header}>Mekanlar</Text>
            <ScrollView>
                <View style={styles.statusContent}>
                    <Text style={styles.header2}>Sayaç Durumları</Text>
                    <TouchableOpacity style={styles.item}>
                        <Text>deneme</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Places