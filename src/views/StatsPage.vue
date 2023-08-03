<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true">
      <!-- TODO - Add Stats -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from "@/components/Header.vue";
</script>
