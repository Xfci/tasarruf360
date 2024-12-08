import 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
// HATA VEREN ŞEREFSİZ SATIR
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import RegisterPage from './src/screens/RegisterPage';
import Main from './src/screens/main';
import AddDevice from './src/screens/AddDevice';
import ForgetPassword from './src/screens/ForgetPassword';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './src/screens/profile';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Devices from './src/screens/myDevices';
import step1 from './src/screens/steps/step1';
import step2 from './src/screens/steps/step2';
import step3 from './src/screens/steps/step3';
import webview from './src/screens/steps/webview';


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
        <Stack.Screen name='main' component={TabScreen} options={{ title: 'Ana Sayfa' }} />
        <Stack.Screen name='addDevice' component={AddDevice} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='step1' component={step1} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='step2' component={step2} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='step3' component={step3} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='webview' component={webview} options={{ headerShown: true, headerLeft:null, title: 'Bağlan', ...TransitionPresets.ModalTransition }} />
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
            <MaterialCommunityIcons name="developer-board" size={30} color={focused ? 'black' : 'lightgray'} />
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
