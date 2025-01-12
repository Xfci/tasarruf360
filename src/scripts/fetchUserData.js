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
        return [data.id,"eposta",data.name];
    }
    if (withUser != null) {
        const data = JSON.parse(withUser);
        return [data.id,"kullanici",data.nickname];
    }
};