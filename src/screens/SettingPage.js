import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const SettingPage = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.appContainer}>
            <View style={styles.plan}>
                <View style={styles.activePlan}>
                    <Text style={{ color: '#ebb734', fontWeight: 500 }}>Aktif Plan</Text>
                </View>
                <View style={styles.planHeader}>
                    <Text style={styles.planHeaderText}>Kişisel</Text>
                </View>
                <Text style={[styles.planHeaderText, { color: '#0084e0' }]}>Bedava</Text>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>Sınırsız cihaz ekleme hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>1 mekan yönetim hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>1 mekan ekleme hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="close" size={25} color="red" style={styles.icon} />
                        <Text style={{}}>Paylaşımsız kullanım.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="close" size={25} color="red" style={styles.icon} />
                        <Text style={{}}>Reklamlı uygulama.</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.plan, { borderColor: '#dba904' }]}>
                <View style={[styles.planHeader, { backgroundColor: '#f2bd11' }]}>
                    <Text style={[styles.planHeaderText, {}]}>Aile Paketi</Text>
                </View>
                <Text style={[styles.planHeaderText, { color: '#dba904' }]}>59 TL</Text>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>Sınırsız cihaz ekleme hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>1 mekan yönetim hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>1 mekan ekleme hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>1 mekan paylaşma hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="close" size={25} color="red" style={styles.icon} />
                        <Text style={{}}>Reklamlı uygulama.</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.buttonOutline, { width: '70%', borderColor: '#f2bd11', marginBottom: 20, flexDirection: 'row' }]}>
                    <Text style={{ color: '#f2bd11', fontSize: 16, fontWeight: '600' }}>Plana Geçiş Yap</Text>
                    <MaterialCommunityIcons name="greater-than" size={20} color="#f2bd11" />
                </TouchableOpacity>
            </View>

            <View style={[styles.plan, { borderColor: '#01a600' }]}>
                <View style={[styles.planHeader, { backgroundColor: '#01c800' }]}>
                    <Text style={[styles.planHeaderText]}>Kurumsal</Text>
                </View>
                <Text style={[styles.planHeaderText, { color: '#01a600' }]}>129 TL</Text>
                <View style={{ marginBottom: 20 }}>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>Sınırsız cihaz ekleme hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>Sınırsız mekan yönetim hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>5 mekan ekleme hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>Mekan paylaşma hakkı.</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="check-all" size={25} color="#1fab54" style={styles.icon} />
                        <Text style={{}}>Reklamsız uygulama.</Text>
                    </View>
                </View>
                <TouchableOpacity style={[styles.buttonOutline, { width: '70%', borderColor: '#01c800', marginBottom: 20, flexDirection: 'row' }]}>
                    <Text style={{ color: '#01c800', fontSize: 16, fontWeight: '600' }}>Plana Geçiş Yap</Text>
                    <MaterialCommunityIcons name="greater-than" size={20} color="#01c800" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SettingPage