import { Text, View } from 'react-native'

const Main = ({ navigation, route,userData }) => {
    console.log(route.params.userData.emailVerified);
    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>
                {route.params.userData.emailVerified}
            </Text>
        </View>
    )
}

export default Main;