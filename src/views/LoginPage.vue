<template>
  <ion-page>
    <ion-content :color="'primary'">
      <div id="container-top">
        <ion-thumbnail class="app-icon">
          <img src="/favicon.png"  alt="App Icon"/>
        </ion-thumbnail>
        <h1>Travel Buddy</h1>
      </div>
      <div id="container-bottom">
        <ion-img src="/google_login.png" @click="loginWithGoogle"></ion-img>
        <ion-text class="error" color="danger" v-if="error">Something went wrong, please try again!</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonThumbnail, IonImg, IonText } from "@ionic/vue";
import { signInWithPopup } from 'firebase/auth'
import { db, getCountriesInfo, getUserInfo, googleAuthProvider } from "@/firebase";
import { getCurrentUser, useFirebaseAuth } from "vuefire";
import router from "@/router";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";

const auth = useFirebaseAuth();
const error = ref(false);

function loginWithGoogle() {
  signInWithPopup(auth!, googleAuthProvider).then(async () => {
    const currentUser = await getCurrentUser();
    const userInfo = await getUserInfo(currentUser?.uid!);

    // Create document for user if it doesn't exist
    if (userInfo == null) {
      const countriesInfo = await getCountriesInfo();

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

    router.push(router.currentRoute.value.query.redirect || '/');
  }).catch((reason) => {
    error.value = true;
    console.error('Failed to login:', reason);
  })
}
</script>

<style scoped>
#container-top, #container-bottom {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

#container-top {
  top: 35%;
}

#container-bottom {
  top: 60%;
}

.app-icon {
  width: 30%;
  height: 30%;
}

.app-icon > img {
  border-radius: 5px;
}

.error {
  margin-top: 2em;
}
</style>
