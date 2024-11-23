import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import Main from './src/screens/main';
import ForgetPassword from './src/screens/ForgetPassword';

const Stack = createNativeStackNavigator();

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,animation:'slide_from_bottom' }}>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ title: 'Login' }}
        />
        <Stack.Screen name='login' component={LoginPage}/>
        <Stack.Screen name='register' component={RegisterPage} />
        <Stack.Screen name='main' component={Main}/>
        <Stack.Screen name='forgetpassword' component={ForgetPassword} />
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
