import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider} from 'firebase/auth';
import {collection, getFirestore} from 'firebase/firestore'
import {FirebaseOptions} from "@firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

const secretsJson = (typeof process !== 'undefined') && process.env.SECRETS_JSON ?
    JSON.parse(process.env.SECRETS_JSON) :
    await import('./../../secrets.json');

export const firebaseApp = initializeApp(secretsJson.firebase as FirebaseOptions);

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(secretsJson.appCheck),
    isTokenAutoRefreshEnabled: true
});

export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const usersCollection = collection(db, 'users');
export const staticCollection = collection(db, 'static');