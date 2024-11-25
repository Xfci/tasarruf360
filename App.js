import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// HATA VEREN ŞEREFSİZ SATIR
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import Main from './src/screens/main';
import ForgetPassword from './src/screens/ForgetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/screens/profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }}>
        <Stack.Screen name='login' component={LoginPage} />
        <Stack.Screen name='register' component={RegisterPage} />
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
        <Stack.Screen name='main' component={TabScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabScreen({route}) {
  const {userData} = route.params;
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false}}>
      <Tabs.Screen name='Ana Sayfa' children={() => <Main userData={userData} />}/>
      <Tabs.Screen name='Profil' component={Profile}/>
    </Tabs.Navigator>
  )
}
