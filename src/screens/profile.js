import { Text, View } from 'react-native'
import { styles } from '../../style';
import ProgressBar from '../components/progressBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Item = ({ title, icon, color, unit, value, value2 }) => (
    <View style={styles.item}>
        <View style={styles.itemIcon}>
            <MaterialCommunityIcons name={icon} size={60} color={color} style={styles.icon} />
        </View>
        <View style={styles.itemContent}>
            <View style={styles.itemHeaderContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.percent}>
                    <Text style={styles.largeText}>{value}</Text>
                    <Text style={styles.smallText}>/{value2} {unit}</Text>
                </View>
            </View>
            <ProgressBar progress={1 / (value2 / value)} color={color} />
        </View>
    </View>
);

const Profile = ({ }) => {
    return (
        <View>
            <Item title="Doğalgaz" icon="fire" color="gray" unit="m³" value={ 0 } value2={200} />

        </View>
    )
}

export default Profile;