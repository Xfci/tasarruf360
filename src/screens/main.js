import { Text, View } from 'react-native'

const Main = ({ navigation,route }) => {
    const bilgiler = route.params.email;

    console.log(bilgiler);

  return (
    <View style = {{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Text style={{textAlign:'center'}}>
            Hoşgeldin! {route.params.email}
        </Text>
    </View>
  )
}

export default Main;