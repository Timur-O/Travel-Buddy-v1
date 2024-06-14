import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider} from 'firebase/auth';
import {collection, getFirestore} from 'firebase/firestore'
import {FirebaseOptions} from "@firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";

let secretJson;
let keysJson;
try {
    secretJson = JSON.parse(process.env.FIREBASE_SECRET_JSON!);
    keysJson = JSON.parse(process.env.FIREBASE_KEYS_JSON!);
} catch (e) {
    secretJson = await import('./secret.json');
    keysJson = await import('./keys.json');
}

export const firebaseApp = initializeApp(secretJson as FirebaseOptions);

const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaEnterpriseProvider(keysJson.appCheck.siteKey),
    isTokenAutoRefreshEnabled: true
});

export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const usersCollection = collection(db, 'users');
export const staticCollection = collection(db, 'static');