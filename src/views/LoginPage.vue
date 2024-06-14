<template>
  <ion-page>
    <ion-content id="background-container">
      <div id="login-container">
        <div id="container-top">
          <ion-thumbnail class="app-icon">
            <img
              alt="App Icon"
              src="/favicon.png"
            >
          </ion-thumbnail>
          <h1 class="title">
            Travel Buddy
          </h1>
          <br>
          <ion-img
            src="/google_login.png"
            @click="loginWithGoogle()"
          />
          <ion-text
            v-if="googleLoginErr"
            class="error"
            color="danger"
          >
            Something went wrong, please try again!
          </ion-text>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonContent,
  IonImg,
  IonPage,
  IonText,
  IonThumbnail
} from "@ionic/vue";
import {ref} from "vue";
import {store} from "@/store";
import {closeOutline} from "ionicons/icons";

const googleLoginErr = ref(false);

function loginWithGoogle() {
  store.dispatch('googleLogin', {
    error: googleLoginErr
  });
}
</script>

<style scoped>
#background-container {
  --background: url("/login-background.jpg") no-repeat center/220%;
}

#login-container {
  height: 100%;
  backdrop-filter: blur(7px);
}

.title {
  font-family: 'Vanity', 'Engebrechtre', sans-serif;
  text-shadow: 1px 1px black;
  font-size: 3em;
}

#container-top {
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

.app-icon {
  width: 30%;
  height: 30%;
}

.app-icon > img {
  border-radius: 35px;
}

.error {
  display: block;
  margin-top: 0.5em;
  text-align: center;
}
</style>
