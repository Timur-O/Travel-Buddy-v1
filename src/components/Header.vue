<template>
  <ion-header>
    <ion-toolbar>
      <ion-title id="header">
        <div id="header">
          <ion-thumbnail @click="router.push('/app/stats')">
            <img id="app-icon" alt="App Icon" src="/favicon.png"/>
          </ion-thumbnail>
          <p id="header-title">Travel Buddy</p>
          <ion-icon v-if="router.currentRoute.value.name != 'settings'"
                    :icon="settingsOutline"
                    aria-label="Settings Button"
                    color="secondary"
                    @click="router.push('/app/settings')"></ion-icon>
          <ion-icon v-if="router.currentRoute.value.name == 'settings'"
                    :icon="closeOutline"
                    aria-label="Close Button"
                    color="secondary"
                    @click="router.back()"></ion-icon>
        </div>
      </ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts" setup>
import {IonHeader, IonIcon, IonThumbnail, IonTitle, IonToolbar} from "@ionic/vue";
import {closeOutline, settingsOutline} from "ionicons/icons";
import router from "@/router";
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

#header-title {
  font-family: 'Vanity', 'Engebrechtre', sans-serif;
  font-weight: bold;
}
</style>