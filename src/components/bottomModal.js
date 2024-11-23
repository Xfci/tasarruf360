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
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{description}</Text>
                    <TouchableOpacity
                        style={[styles.buttonModal]}
                        onPress={onClose}>
                        <Text style={styles.textStyle}>Devam Et</Text>
                    </TouchableOpacity>
                    {
                        functionModal ?
                            <TouchableOpacity
                                style={styles.buttonModal}
                                onPress={[{ onClose }, ReSendVerification(email, password)]}>
                                <Text style={styles.textStyle}>Tekrar Gönder</Text>
                            </TouchableOpacity> : null
                    }
                    <Image source={image} style={styles.banner3} />
                </View>
            </View>
        </Modal>
    )
}


export default BottomModal

const styles = StyleSheet.create({
    //Modal
    centeredView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalView: {
        width: '100%',
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#0089ec',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    functionModalClose: {
        backgroundColor: 'tomato',
    },

    modalText: {
        textAlign: 'center',
        padding: 25,
    },
    banner3: {
        width: '100%',
        height: '70%',
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
        bottom: -10,
    },
})