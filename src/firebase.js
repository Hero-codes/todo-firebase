import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyBTZ0iLtfyTsGfPU7CB6o-yqDRBngSnCis",
    authDomain: "todo-4b73d.firebaseapp.com",
    projectId: "todo-4b73d",
    storageBucket: "todo-4b73d.appspot.com",
    messagingSenderId: "990340360601",
    appId: "1:990340360601:web:7f6d9418b42fcc2daa0b08",
    measurementId: "G-7R9TQCRM2J"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);