import {initializeApp} from 'firebase/app';
import {GoogleAuthProvider} from 'firebase/auth';
import {collection, doc, getFirestore} from 'firebase/firestore'
import {useDocument} from "vuefire";
import CountriesInfo from "@/models/CountriesInfo";
import UserInfo from "@/models/UserInfo";
import secret from './secret.json';
import {FirebaseOptions} from "@firebase/app";

export const firebaseApp = initializeApp(secret as FirebaseOptions);

export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const usersCollection = collection(db, 'users');
export const staticCollection = collection(db, 'static');