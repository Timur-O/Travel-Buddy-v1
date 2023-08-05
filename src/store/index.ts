import {createStore, Store} from "vuex";
import {signInWithPopup, signOut} from 'firebase/auth'
import {getCountriesInfo, getUserInfo, googleAuthProvider, usersCollection} from "@/firebase/firebase";
import {getCurrentUser, useFirebaseAuth} from "vuefire";
import router from "@/router";
import {doc, setDoc} from "firebase/firestore";
import World from "@/models/World";
import Region from "@/models/Region";
import Country from "@/models/Country";
import UserInfo from "@/models/UserInfo";
import CountriesInfo from "@/models/CountriesInfo";
import {InjectionKey} from "vue";

// define typings for store state
export interface State {
    userInfo: UserInfo | null,
    countriesInfo: CountriesInfo | null
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
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

                    const unCountries = Object.values(countriesInfo.un).flatMap((region: Array<any>) => {
                        return region.map((country) => {
                            return {
                                code: country.cca3,
                                visited: false
                            };
                        });
                    });
                    const nonUnCountries = Object.values(countriesInfo.nonUn).flatMap((region: Array<any>) => {
                        return region.map((country) => {
                            return {
                                code: country.cca3,
                                visited: false
                            };
                        });
                    });
                    const nonSovereignCountries = Object.values(countriesInfo.nonSovereign).flatMap((region: Array<any>) => {
                        return region.map((country) => {
                            return {
                                code: country.cca3,
                                visited: false
                            };
                        });
                    });

                    await setDoc(doc(usersCollection, currentUser?.uid), {
                        name: currentUser?.displayName,
                        email: currentUser?.email,
                        includeNonSovereign: false,
                        countries: {
                            un: unCountries,
                            nonUn: nonUnCountries,
                            nonSovereign: nonSovereignCountries
                        }
                    });
                }

                context.commit("setUserInfo", userInfo);
                await router.push(router.currentRoute.value.query.redirect || '/');
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
        countriesInfo: (state) => state.countriesInfo,
        sovereignWorld: (state) => {
            // Combine UN and non-UN countries
            let sovereign: any = {};
            Object.entries(state.countriesInfo!.un).forEach(([region, countries]) => {
                countries.forEach((country: any) => {
                    country['type'] = 'un';
                });
                sovereign[region] = countries;
            });
            Object.entries(state.countriesInfo!.nonUn).forEach(([region, countries]) => {
                if (sovereign[region] == undefined) {
                    sovereign[region] = [];
                }
                countries.forEach((country: any) => {
                    country['type'] = 'nonUn';
                });
                sovereign[region] = sovereign[region].concat(countries);
            });
            Object.entries(sovereign).forEach(([region, countries]) => {
                sovereign[region] = countries.sort((a: any, b: any) => {
                    return a.name.common.localeCompare(b.name.common);
                });
            });

            // Combine UN and non-UN countries (for user data)
            let userSovereign: Array<any> = [];
            state.userInfo!.countries.un.forEach((country) => {
               userSovereign.push(country);
            });
            state.userInfo!.countries.nonUn.forEach((country) => {
                userSovereign.push(country);
            });

            return new World(
                Object.entries(sovereign).map(([region, countries]) => {
                    return new Region(
                        region,
                        countries.map((country: any) => {
                            let userCountry = userSovereign.find((userCountry) => {
                                return userCountry.code == country.cca3;
                            });

                            let visited = false;
                            if (userCountry != undefined) {
                                visited = userCountry.visited;
                            }

                            return new Country(
                                country.cca3,
                                country.type,
                                country.name.common,
                                country.flag,
                                country.area,
                                visited
                            );
                        })
                    );
                })
            );
        },
        nonSovereignWorld: (state) => {
            return new World(
                Object.entries(state.countriesInfo!.nonSovereign).map(([region, countries]) => {
                    return new Region(
                        region,
                        countries.map((country: any) => {
                            let userCountry = state.userInfo!.countries.nonSovereign.find((userCountry) => {
                                return userCountry.code == country.cca3;
                            });

                            let visited = false;
                            if (userCountry != undefined) {
                                visited = userCountry.visited;
                            }

                            return new Country(
                                country.cca3,
                                'nonSovereign',
                                country.name.common,
                                country.flag,
                                country.area,
                                visited
                            );
                        })
                    );
                })
            );
        },
        wholeWorld: (state) => {
            // Combine all
            let all: any = {};
            Object.entries(state.countriesInfo!.un).forEach(([region, countries]) => {
                countries.forEach((country: any) => {
                    country['type'] = 'un';
                });
                all[region] = countries;
            });
            Object.entries(state.countriesInfo!.nonUn).forEach(([region, countries]) => {
                if (all[region] == undefined) {
                    all[region] = [];
                }
                countries.forEach((country: any) => {
                    country['type'] = 'nonUn';
                });
                all[region] = all[region].concat(countries);
            });
            Object.entries(state.countriesInfo!.nonSovereign).forEach(([region, countries]) => {
                if (all[region] == undefined) {
                    all[region] = [];
                }
                countries.forEach((country: any) => {
                    country['type'] = 'nonSovereign';
                });
                all[region] = all[region].concat(countries);
            });
            Object.entries(all).forEach(([region, countries]) => {
                all[region] = countries.sort((a: any, b: any) => {
                    return a.name.common.localeCompare(b.name.common);
                });
            });

            // Combine UN and non-UN countries (for user data)
            let userAll: Array<any> = [];
            state.userInfo!.countries.un.forEach((country) => {
                userAll.push(country);
            });
            state.userInfo!.countries.nonUn.forEach((country) => {
                userAll.push(country);
            });
            state.userInfo!.countries.nonSovereign.forEach((country) => {
                userAll.push(country);
            });

            return new World(
                Object.entries(all).map(([region, countries]) => {
                    return new Region(
                        region,
                        countries.map((country: any) => {
                            let userCountry = userAll.find((userCountry) => {
                                return userCountry.code == country.cca3;
                            });

                            let visited = false;
                            if (userCountry != undefined) {
                                visited = userCountry.visited;
                            }

                            return new Country(
                                country.cca3,
                                country.type,
                                country.name.common,
                                country.flag,
                                country.area,
                                visited
                            );
                        })
                    );
                })
            );
        }
    }
});