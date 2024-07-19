import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider} from 'firebase/auth';
import {collection, getFirestore} from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const firebaseConfig = {
    apiKey: "AIzaSyDMzQP3OfzD-DUBj71OuRQ6Fs5iKQswTWU",
    authDomain: "travel-buddy-995f7.firebaseapp.com",
    projectId: "travel-buddy-995f7",
    storageBucket: "travel-buddy-995f7.appspot.com",
    messagingSenderId: "700063942314",
    appId: "1:700063942314:web:018787bb6f1739e0c4f2d3"
};

export const firebaseApp = initializeApp(firebaseConfig);

export const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider("6Le8l_gpAAAAAK9YGIhVmKqjHvEVk3yD5S6W6c0k"),
    isTokenAutoRefreshEnabled: true
});

export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const usersCollection = collection(db, 'users');
export const staticCollection = collection(db, 'static');