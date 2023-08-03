<template>
  <ion-header>
    <ion-toolbar>
      <ion-title id="header">
        <div id="header">
          <ion-thumbnail>
            <img id="app-icon" alt="App Icon" src="/favicon.png" />
          </ion-thumbnail>
          <p>Travel Buddy</p>
          <ion-icon color="danger" aria-label="Sign Out Button" :icon="exitOutline" @click="signOut"></ion-icon>
        </div>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonButton, IonThumbnail, IonIcon } from "@ionic/vue";
import {exitOutline} from "ionicons/icons";

function signOut() {
  console.log("Sign Out");
}
</script>

<style>
#app-icon {
  border-radius: 5px;
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>