import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import LoginPage from './src/screens/LoginPage';

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

const Stack = createNativeStackNavigator();

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{title: 'Login'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
