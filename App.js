import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkJQa2M4lXIrXxFT7WKdt_kwJvBTxPABM",
  authDomain: "tasarruf360-114b5.firebaseapp.com",
  projectId: "tasarruf360-114b5",
  storageBucket: "tasarruf360-114b5.firebasestorage.app",
  messagingSenderId: "273957416221",
  appId: "1:273957416221:web:acb321a08de039c6dec5f4",
  measurementId: "G-B2RDS6PYWS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Main App
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Style File
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
