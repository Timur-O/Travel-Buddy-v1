<template>
  <ion-header>
    <ion-toolbar>
      <ion-title id="header">
        <div id="header">
          <ion-thumbnail>
            <img id="app-icon" alt="App Icon" src="/favicon.png" />
          </ion-thumbnail>
          <p id="header-title">Travel Buddy</p>
          <ion-icon color="danger" aria-label="Sign Out Button" :icon="exitOutline" @click="logout"></ion-icon>
        </div>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonThumbnail, IonIcon } from "@ionic/vue";
import { exitOutline } from "ionicons/icons";
import { signOut } from 'firebase/auth'
import router from "@/router";
import { useFirebaseAuth } from "vuefire";

const auth = useFirebaseAuth();

function logout() {
  signOut(auth!).then(() => {
    router.push('/login');
  }).catch((reason) => {
    console.error('Failed to logout:', reason);
  })
}
</script>

<style scoped>
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