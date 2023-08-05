<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <!-- TODO - Add Maps -->
      <h1 id="coming-soon">Coming Soon!</h1>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonContent, IonPage} from '@ionic/vue';
</script>

<style scoped>
#coming-soon {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 40%;
  transform: translateY(-50%);
}
</style>
