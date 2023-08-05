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
        <ion-img src="/google_login.png" @click="store.dispatch('login', { error: loginErr })"></ion-img>
        <ion-text class="error" color="danger" v-if="loginErr">Something went wrong, please try again!</ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonThumbnail, IonImg, IonText} from "@ionic/vue";
import {ref} from "vue";
import {store} from "@/store";

const loginErr = ref(false);
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
