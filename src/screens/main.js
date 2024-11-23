import { Text, View } from 'react-native'

const Main = ({ navigation, route,userData }) => {
    return (
        <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>
                Hoşgeldin! {route.params.userData.email}
            </Text>
        </View>
    )
}

export default Main;