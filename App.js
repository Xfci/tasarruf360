import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// HATA VEREN ŞEREFSİZ SATIR
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import Main from './src/screens/main';
import ForgetPassword from './src/screens/ForgetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/screens/profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Global from './src/screens/globalScreen';
import Devices from './src/screens/myDevices';


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
        <Stack.Screen name='main' component={TabScreen} />
        <Stack.Screen name='global' component={Global} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabScreen({ route }) {
  const user = route.params;

  return (
    <Tabs.Navigator
      screenOptions={{ headerShown: false }}>

      <Tabs.Screen name='Ana Sayfa' children={() => (<Main user={user} />)}
        options={{
          title: 'Ana sayfa',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" size={30} color={focused ? 'black' : 'lightgray'} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray'
        }} />
      <Tabs.Screen name='Devices' children={() => (<Devices user={user} />)}
        options={{
          title: 'Cihazlarım',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={30} color={focused ? 'black' : 'lightgray'} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray'
        }} />
      <Tabs.Screen name='Profil' children={() => (<Profile user={user} />)}
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={30} color={focused ? 'black' : 'lightgray'} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray'
        }} />
    </Tabs.Navigator>
  )
}
