import { Text, View } from 'react-native'
import { styles } from '../../style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from '../components/progressBar';
import { ActivityIndicator } from 'react-native-web';

export const Item = ({ title, icon, color, unit, value, value2 }) => {
    if (value != 0 || value2 != 0) {
        return (
            <View style={styles.item}>
                <View style={styles.itemIcon}>
                    <MaterialCommunityIcons name={icon} size={60} color={color} style={styles.icon} />
                </View>
                <View style={styles.itemContent}>
                    <View style={styles.itemHeaderContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.percent}>
                            <Text style={styles.largeText}>{value2}</Text>
                            <Text style={styles.smallText}>/{value} {unit}</Text>
                        </View>
                    </View>
                    <ProgressBar progress={(1 / (value / value2))} color={color} />
                </View>
            </View>
        )
    } else {
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator color={'#fff'} size={'large'}/>
        </View>
    }
};