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
import Places from './src/screens/Places';
import Devices from './src/screens/myDevices';
import step1 from './src/screens/steps/step1';
import step2 from './src/screens/steps/step2';
import step3 from './src/screens/steps/step3';
import device from './src/screens/Device';
import addplace from './src/screens/addPlace';
import { StatusBar } from 'react-native';


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, ...TransitionPresets.ModalSlideFromBottomIOS }}>
        <Stack.Screen name='login' component={LoginPage} options={{title:'Hoşgeldiniz | Giriş Yap'}}/>
        <Stack.Screen name='register' component={RegisterPage} options={{title:'Üye ol'}}/>
        <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
        <Stack.Screen name='main' component={TabScreen} options={{ title: 'Ana Sayfa' }} />
        <Stack.Screen name='step1' component={step1} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='step2' component={step2} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='step3' component={step3} options={{ headerShown: true, headerBackTitle: "", title: 'Cihaz Ekle', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='device' component={device} options={{ headerShown: false, headerBackTitle: "", headerTintColor: 'black', headerShadowVisible: false, title: 'Cihazım', ...TransitionPresets.SlideFromRightIOS }} />
        <Stack.Screen name='addplace' component={addplace} options={{ headerShown: true, headerBackTitle: "", headerTintColor: 'black',headerShadowVisible: false, title: 'Mekan Ekle', ...TransitionPresets.ModalTransition }} />
      </Stack.Navigator>
      <StatusBar barStyle={'light-content'}/>
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
          title: 'Gösterge',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="chart-box" size={30} color={focused ? 'black' : 'lightgray'} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray'
        }} />
      <Tabs.Screen name='Places' children={() => (<Places user={user} />)}
        options={{
          title: 'Mekanlar',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home-automation" size={30} color={focused ? 'black' : 'lightgray'} />
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
          title: 'Ayarlar',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="cog" size={30} color={focused ? 'black' : 'lightgray'} />
          ),
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray'
        }} />
    </Tabs.Navigator>
  )
}
