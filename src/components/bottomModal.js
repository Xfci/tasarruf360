import { StyleSheet, Text, View, Modal, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ReSendVerification from '../scripts/reSendVerification';

const BottomModal = ({ description, image, visibleState, functionModal, email, password, onClose }) => {
    const [modalVisible, setModalVisible] = useState(visibleState);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibleState}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!visibleState);
            }}>
            <View style={styles.shadow}></View>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.content}>
                        <Text style={styles.modalText}>{description}</Text>
                        <View style={{ flexDirection: 'row', justifyContent:'center',gap:10}}>
                            <TouchableOpacity
                                style={[styles.buttonModal]}
                                onPress={onClose}>
                                <Text style={styles.textStyle}>Devam Et</Text>
                            </TouchableOpacity>
                            {
                                functionModal ?
                                    <TouchableOpacity
                                        style={styles.functionModal}
                                        onPress={async () => await ReSendVerification().then(() => {onClose})}>
                                        <Text style={[styles.textStyle, {color:'tomato'}]}>Tekrar Gönder</Text>
                                    </TouchableOpacity> : null
                            }
                        </View>
                    </View>
                    <View style={styles.imageWrapper}>
                        <Image source={image} style={styles.banner3} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}


export default BottomModal

const styles = StyleSheet.create({
    //Modal
    shadow:{
        flex:1,
        backgroundColor:'#000',
        opacity:0.3,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        width: '100%',
        height: '105%',
        flex: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    content: {
        flex: 1,
        justifyContent: 'space-around'
    },
    imageWrapper: {
        flex: 2, // Gerekirse bu değeri 1 veya 2 yapabilirsiniz
        width: '100%', // Görüntünün genişliği kapsayıcıya uyacak şekilde ayarlanır
        justifyContent: 'center', // Görüntüyü ortalamak için
        alignItems: 'center', // Görüntüyü ortalamak için
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        borderColor: '#f2bd11',
        borderWidth: 4,
        paddingVertical: 10,  // Yalnızca dikey padding ekleyin
        paddingHorizontal: 30, // Yatay padding ekleyerek içeriğin etrafına boşluk verin
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',  // Butonun genişliği yazıya göre ayarlanacak
        marginBottom: 20
    },
    textStyle: {
        color: '#f2bd11',
        fontWeight: '900'
    },
    functionModal: {
        borderRadius: 20,
        padding: 10,
        borderColor: 'tomato',
        borderWidth: 4,
        paddingVertical: 10,  // Yalnızca dikey padding ekleyin
        paddingHorizontal: 30, // Yatay padding ekleyerek içeriğin etrafına boşluk verin
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',  // Butonun genişliği yazıya göre ayarlanacak
        marginBottom: 20
    },
    modalText: {
        textAlign: 'center',
        padding: 25,
    },
    banner3: {
        height: '100%',
        width: '100%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        resizeMode: 'stretch'
    },
})