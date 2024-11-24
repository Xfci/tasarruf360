import { sendEmailVerification, getAuth } from '../../config'

//yeniden doğrulama gönderme
async function ReSendVerification() {
    const auth = getAuth();
    try {
        const user = auth.currentUser;
        if (user) {
            try {
                await sendEmailVerification(user);
                console.log("eposta yeniden gönderildi"); 
            } catch (error) {
                console.log("bir hata meydana geldi");
            }
        }else{
            console.log("kullanıcı yok");
        }
    } catch (error) {
        console.log(error);
    }
}

export default ReSendVerification;