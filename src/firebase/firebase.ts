import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc } from 'firebase/firestore'
import { useDocument } from "vuefire";
import CountriesInfo from "@/models/CountriesInfo";
import UserInfo from "@/models/UserInfo";
import secret from './secret.json';
import { FirebaseOptions } from "@firebase/app";

export const firebaseApp = initializeApp(secret as FirebaseOptions);

export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(firebaseApp);
export const usersCollection = collection(db, 'users');
export const staticCollection = collection(db, 'static');

let userInfo: any = null;
let countriesInfo: any = null;

export async function getUserInfo(userId: string): Promise<UserInfo> {
    if (userInfo == null) {
        const {promise} = useDocument(doc(usersCollection, userId));
        userInfo = await promise.value;
    }
    return userInfo;
}

export async function getCountriesInfo(): Promise<CountriesInfo> {
    if (countriesInfo == null) {
        const {promise} = useDocument(doc(staticCollection, 'countries'));
        countriesInfo = await promise.value;
    }
    const parsedCountriesInfo = new CountriesInfo();
    parsedCountriesInfo.un = JSON.parse(countriesInfo.un);
    parsedCountriesInfo.nonUn = JSON.parse(countriesInfo.nonUn);
    parsedCountriesInfo.nonSovereign = JSON.parse(countriesInfo.nonSovereign);
    return parsedCountriesInfo;
}

