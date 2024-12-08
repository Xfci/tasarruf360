import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function Webview() {
    return <WebView source={{ uri: 'http://192.168.4.1/' }} style={{ flex: 1 }} />;
}
