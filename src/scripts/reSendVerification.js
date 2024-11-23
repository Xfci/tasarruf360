import { firebase, sendEmailVerification } from '../../config'
//yeniden doğrulama gönderme
async function ReSendVerification(email, password) {
    setLoading(true);
    try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        await sendEmailVerification(user.user);
        console.log("eposta yeniden gönderildi");
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}

export default ReSendVerification;