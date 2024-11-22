//app auth realtime için import
import firebase from "firebase/compat/app"
import "firebase/compat/auth";
import "firebase/compat/database"
import { getDatabase } from "firebase/database";

//firebase url ayarları
const firebaseConfig = {
    apiKey: "AIzaSyCkJQa2M4lXIrXxFT7WKdt_kwJvBTxPABM",
    authDomain: "tasarruf360-114b5.firebaseapp.com",
    projectId: "tasarruf360-114b5",
    storageBucket: "tasarruf360-114b5.firebasestorage.app",
    messagingSenderId: "273957416221",
    appId: "1:273957416221:web:acb321a08de039c6dec5f4",
    measurementId: "G-B2RDS6PYWS"
};

//firebase başlatılması
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export default firebase;