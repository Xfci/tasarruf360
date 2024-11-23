import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    formContainer: {
        padding: 10,
        height: '100%',
        width: '100%',
    },
    banner: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,

    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 5
    },
    formContainer: {
        height: '100%',
        width: '100%',
        padding: 20,
    },
    input: {
        backgroundColor: '#dbdbdb',
        borderRadius: 20,
        padding: 15,
        width: '100%',
        maxWidth: 600,
        marginTop: 20,
        fontSize: 14,
    },
    link: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    navigateLink: {
        textDecorationLine: 'underline',
        color: '#0089ec'
    },
    button: {
        backgroundColor: '#0089ec',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginTop: 25
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    svg: {
        width: '100%',
        height: '38%',
    },
    alt: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40
    },
    banner3: {
        width: '100%',
        height: '40%',
        borderBottomRightRadius: 35,
        borderBottomLeftRadius: 30
    }
})