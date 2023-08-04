<template>
  <ion-page>
    <ion-content :color="'primary'">
      <div class="container">
        <ion-thumbnail class="app-icon">
          <img src="/favicon.png"  alt="App Icon"/>
        </ion-thumbnail>
        <h1>Travel Buddy</h1>
        <ion-img src="/google_login.png" @click="loginWithGoogle"></ion-img>
        <ion-text color="danger" v-if="error">Something went wrong, please try again!</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonThumbnail, IonImg } from "@ionic/vue";
import { signInWithPopup } from 'firebase/auth'
import { googleAuthProvider } from "@/firebase";
import {useFirebaseAuth} from "vuefire";
import router from "@/router";

const auth = useFirebaseAuth();
let error = false;

function loginWithGoogle() {
  signInWithPopup(auth!, googleAuthProvider).then(() => {
    router.push(router.currentRoute.value.query.redirect || '/');
  }).catch((reason) => {
    error = true;
    console.error('Failed to login:', reason);
  })
}
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.app-icon {
  width: 30%;
  height: 30%;
}

.app-icon > img {
  border-radius: 5px;
}
</style>
