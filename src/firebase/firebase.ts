import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider} from 'firebase/auth';
import {collection, getFirestore} from 'firebase/firestore'
import secret from './secret.json';
import keys from './keys.json';
import {FirebaseOptions} from "@firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

export const firebaseApp = initializeApp(secret as FirebaseOptions);

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(keys.appCheck.siteKey),
    isTokenAutoRefreshEnabled: true
});

export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const usersCollection = collection(db, 'users');
export const staticCollection = collection(db, 'static');