import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function Webview() {
    const navigation = useNavigation();
    return <WebView source={{ uri: 'http://192.168.4.1/' }} style={{ flex: 1 }} onError={() => navigation.navigate('step3')}/>;
}
