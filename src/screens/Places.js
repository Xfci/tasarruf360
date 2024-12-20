import { View, Text, Image } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import React from 'react'

const Places = () => {
    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.header}>Mekanlar</Text>
            <ScrollView>
                <View style={styles.imageContainer}>
                    {/* Görsel */}
                    <Image
                        source={{ uri: 'https://via.placeholder.com/300' }}
                        style={styles.image}
                    />
                    {/* Opaklık Efekti */}
                    <View style={styles.opacityOverlay} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Places