import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex:1,
        height: '100%',
        width: '100%',
    },
    banner: {
        width: "100%",
        height: "115%",
    },
    header: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 10,
        marginHorizontal: 10,
        marginTop:10
    },
    header2: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5
    },
    link: {
        alignSelf: 'flex-end',
        marginBottom: 15
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

    },
    buttonOutline: {
        backgroundColor: '#fff',
        borderColor: '#f2bd11',
        borderWidth: 4,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 18
    },
    appButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    alt: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    bannerImage: {
        flex: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    content: {
        flex: 3,
        paddingHorizontal: 25,
        paddingTop:25,
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        zIndex: 1
    },
    contentBottom: {
        flex: 1.5,
        paddingHorizontal: 25,
        paddingBottom: 25,
        justifyContent: 'space-around',
        backgroundColor:'#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 15,
        paddingHorizontal: 15,
        width: '100%',
        maxWidth: 600,
        marginBottom: 30,
    },
    icon: {
        marginRight: 12, // İkon ile metin arasındaki boşluğu artırır
    },
    textInput: {
        flex: 1, // Esneklik veriyoruz, TextInput geniş alanı kaplar
        fontSize: 16,
        paddingVertical: 15,
    },
    inputWrapper: {
        flex: 1, // Bu, input öğelerinin arasındaki alanı eşit şekilde dağıtmak için kullanılır
        justifyContent: 'space-between', // Öğeler arasındaki mesafeyi eşitler
        flexDirection: 'column',
    },
    errorText: {
        color: 'red',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginVertical: 5,
        borderColor:'#f1f1f1',
        borderWidth:2,
        padding:10,
        
    },
    itemIcon: {
        flex: 1,
    },
    itemContent: {
        flex: 4,
        justifyContent: 'space-around'
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    deviceTitle:{
        fontSize:16,
        fontWeight:'500'
    },  
    deviceParentTitle:{
        fontSize:13,
        fontWeight:'300'
    },  
    macTitle:{
        color:'gray',
        fontWeight:'200'
    },
    emptyTitle:{
        color:'gray',
        textAlign:'center',
        padding:10
    },
    statusContent: {
        borderRadius: 15,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    appContainer: {
        maxWidth:1000,
        alignSelf:'center',
        height: '105%',
        width: '100%',
    },
    webAppContainer: {
        maxWidth:1000,
        alignSelf:'end',
        height: '100%',
        width: '100%',
    },
    itemHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    percent: {
        flexDirection: 'row', // Yazıları yan yana yerleştirmek için
        alignItems: 'flex-end',
    },
    largeText: {
        fontSize: 18, // Büyük metin boyutu
        fontWeight: 'bold',
    },
    smallText: {
        fontSize: 12, // Küçük metin boyutu
        marginBottom: 3
    },
    porfileContainer:{
        marginVertical:20,
        flex:1,
        backgroundColor:'#eee',
        borderEndEndRadius:50,
        paddingHorizontal:10,
        alignItems:'center',
        flexDirection:'row'
    },  
    profileContent:{
        paddingTop:20,
        flex:3,
        backgroundColor:'#fff',
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    part:{
        flex:1,
    },
    profileText:{
        color:'darkgray',
    },
    profileName:{
        fontWeight:'bold',
        fontSize:20
    },  
    editButton:{
        backgroundColor:'#a6a6a6',
        width:50,
        height:50,
        alignSelf:'flex-end',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
        borderColor:'#828282',
        borderWidth:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,

        elevation: 5,
    },
    profileButton:{
        borderColor:'#eeeeee',
        borderBottomWidth:1,
        width:'100%',
        padding:15,
        paddingVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    profileButtonText:{
        fontSize:16,
        fontWeight:'500',
    },
    row:{
        flexDirection:'row',
    },
    plan:{
        flex:1,
        borderWidth:5,
        borderColor:'#0084e0',
        borderRadius:30,
        margin:10,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    planHeader:{
        width:'70%',
        backgroundColor:'#0095fe',
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        alignItems:'center'
    },
    planHeaderText:{
        color:'#fff',
        fontSize:20,
        fontWeight:800,
        margin:20
    },
    activePlan:{
        position:'absolute',
        alignSelf:'flex-start',
        backgroundColor:'#c92222',
        borderBottomRightRadius:15,
        borderTopLeftRadius:25,
        padding:10,
        zIndex:1
    }
});