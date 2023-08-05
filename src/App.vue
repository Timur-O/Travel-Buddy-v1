<template>
  <ion-app>
    <Suspense>
      <template #default>
        <ion-router-outlet />
      </template>
      <template #fallback>
        <ion-content :color="'primary'">
          <div id="container">
            <ion-thumbnail class="app-icon">
              <img src="/favicon.png"  alt="App Icon"/>
            </ion-thumbnail>
            <ion-spinner name="dots"></ion-spinner>
          </div>
        </ion-content>
      </template>
    </Suspense>
  </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonContent, IonRouterOutlet, IonThumbnail, IonSpinner} from '@ionic/vue';
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
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

@font-face {
  font-family: "Vanity";
  src: local("Vanity"),
  url(./fonts/vanity/Vanity-LightWide.ttf) format("truetype");
}

@font-face {
  font-family: "Engebrechtre";
  src: local("Engebrechtre"),
  url(./fonts/engebrechtre/Engebrechtre-Ex.otf) format("opentype");
}
</style>