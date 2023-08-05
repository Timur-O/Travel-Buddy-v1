<template>
  <ion-page>
    <ion-content id="login-container">
      <div id="container-top">
        <ion-thumbnail class="app-icon">
          <img alt="App Icon" src="/favicon.png"/>
        </ion-thumbnail>
        <h1 class="title">Travel Buddy</h1>
      </div>
      <div id="container-bottom">
        <ion-img src="/google_login.png"
                 @click="store.dispatch('login', { error: loginErr })"></ion-img>
        <ion-text v-if="loginErr"
                  class="error"
                  color="danger">
          Something went wrong, please try again!
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonContent, IonImg, IonPage, IonText, IonThumbnail} from "@ionic/vue";
import {ref} from "vue";
import {store} from "@/store";

const loginErr = ref(false);
</script>

<style scoped>
#login-container {
  --background: url("/login-background.jpg") no-repeat center/220%;
}

.title {
  font-family: 'Vanity', 'Engebrechtre', sans-serif;
  text-shadow: 1px 1px black;
  font-size: 3em;
}

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
