import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// HATA VEREN ŞEREFSİZ SATIR
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import Main from './src/screens/main';
import ForgetPassword from './src/screens/ForgetPassword';

const Stack = createStackNavigator();

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,...TransitionPresets.ModalSlideFromBottomIOS }}>
        <Stack.Screen name='login' component={LoginPage}/>
        <Stack.Screen name='register' component={RegisterPage}/>
        <Stack.Screen name='main' component={Main}/>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
