/*import { useState } from 'react';
import { firebase, sendEmailVerification } from '../../config'
//yeniden doğrulama gönderme
async function ReSendVerification(email, password) {
    const [loading,setLoading] = useState(false);
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

export default ReSendVerification;*/