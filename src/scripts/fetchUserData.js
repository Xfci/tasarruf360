import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserData = async () => {
    const withGoogle = await AsyncStorage.getItem('@user');
    const withPosta = await AsyncStorage.getItem('@userData');
    const withUser = await AsyncStorage.getItem('@kullanici');
    if (withGoogle != null) {
        const data = JSON.parse(withGoogle);
        return [data.id,"google",data.name,data.picture];
    }
    if (withPosta != null) {
        const data = JSON.parse(withPosta);
        return [data.id,"eposta",data.email.toString().replace("@gmail.com","")];
    }
    if (withUser != null) {
        return [JSON.parse(withUser),"kullanici"];
    }
};