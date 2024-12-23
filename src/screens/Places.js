import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../../style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons/';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Places = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.header}>Mekanlar</Text>
            <ScrollView>
                <View style={styles.statusContent}>
                    { /*<Text style={styles.emptyTitle}>Sana ait mekan yok.</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.header2}>Benim mekanlarım</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('addplace')}>
                            <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]}>
                        <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 15 }}>
                            <Image source={require('../../assets/images/okul.jpg')} style={{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }} />
                        </View>
                        <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>Pendik İTO Mesleki ve Teknik Anadolu Lisesi</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/images/denemexfci.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -13 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -25 }} />
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right' }} >Yönetici: 5</Text>
                                    <Text style={{ textAlign: 'right' }}>Cihaz: 10</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.statusContent}>
                    { /*<Text style={styles.emptyTitle}>Yetkili olduğun mekan yok.</Text> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.header2}>Yetkili olduğun mekanlar</Text>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="plus-circle" size={30} color="#0089ec" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.item, { height: 150, borderColor: 'gray', padding: 0, backgroundColor: '#f5f5f5' }]}>
                        <View style={{ flex: 1, backgroundColor: 'gray', borderRadius: 15 }}>
                            <Image source={require('../../assets/images/yunusemre.jpg')} style={{ height: '100%', width: '100%', borderBottomLeftRadius: 15, borderTopLeftRadius: 15 }} />
                        </View>
                        <View style={{ flex: 1, padding: 10, justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, textAlign: 'right', fontWeight: 700 }}>Yusuf Emre Mesleki ve Teknik Anadolu Lisesi</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1 }} />
                                    <Image source={require('../../assets/user.jpg')} style={{ height: 30, width: 30, borderRadius: 100, borderColor: '#fff', borderWidth: 1, left: -10 }} />
                                </View>
                                <View style={{ alignSelf: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right' }} >Yönetici: 2</Text>
                                    <Text style={{ textAlign: 'right' }}>Cihaz: 8</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Places