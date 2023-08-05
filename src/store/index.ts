import { createStore } from "vuex";
import {signInWithPopup, signOut} from 'firebase/auth'
import { db, getCountriesInfo, getUserInfo, googleAuthProvider } from "@/firebase";
import { getCurrentUser, useFirebaseAuth } from "vuefire";
import router from "@/router";
import { doc, setDoc } from "firebase/firestore";

const store = createStore({
    state: {
        userInfo: null,
        countriesInfo: null
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setCountriesInfo(state, countriesInfo) {
            state.countriesInfo = countriesInfo;
        }
    },
    actions: {
        async login(context, { error }) {
            signInWithPopup(useFirebaseAuth()!, googleAuthProvider).then(async () => {
                const currentUser = await getCurrentUser();
                const userInfo = await getUserInfo(currentUser?.uid!);

                // Create document for user if it doesn't exist
                if (userInfo == null) {
                    const countriesInfo = await getCountriesInfo();
                    context.commit("setCountriesInfo", countriesInfo);

                    const unCountries = Object.values(JSON.parse(countriesInfo.un)).flatMap((region) => {
                        return region.map((country) => {
                            return {
                                code: country.cca3,
                                visited: false
                            };
                        });
                    });
                    const nonUnCountries = Object.values(JSON.parse(countriesInfo.nonUn)).flatMap((region) => {
                        return region.map((country) => {
                            return {
                                code: country.cca3,
                                visited: false
                            };
                        });
                    });
                    const nonSovereignCountries = Object.values(JSON.parse(countriesInfo.nonSovereign)).flatMap((region) => {
                        return region.map((country) => {
                            return {
                                code: country.cca3,
                                visited: false
                            };
                        });
                    });

                    await setDoc(doc(db, "users", currentUser?.uid), {
                        name: currentUser?.displayName,
                        email: currentUser?.email,
                        countries: {
                            un: unCountries,
                            nonUn: nonUnCountries,
                            nonSovereign: nonSovereignCountries
                        }
                    });
                }

                context.commit("setUserInfo", userInfo);
                router.push(router.currentRoute.value.query.redirect || '/');
            }).catch((reason) => {
                error.value = true;
                console.error('Failed to login:', reason);
            });
        },
        async logout(context) {
            signOut(useFirebaseAuth()!).then(() => {
                router.push('/login');
            }).catch((reason) => {
                console.error('Failed to logout:', reason);
            });

            context.commit("setUserInfo", null);
        },
        async fetchUserInfo(context) {
            const currentUser = await getCurrentUser();
            const userInfo = await getUserInfo(currentUser?.uid!);
            context.commit("setUserInfo", userInfo);
        },
        async fetchCountriesInfo(context) {
            const countriesInfo = await getCountriesInfo();
            context.commit("setCountriesInfo", countriesInfo);
        }
    },
    getters: {
        userInfo: (state) => state.userInfo,
        countriesInfo: (state) => state.countriesInfo
    }
});

export default store;