<template>
    <ion-list :inset="true">
      <ion-item>
        <ion-label class="header">Region:</ion-label>
        <ion-label class="header">By Number:</ion-label>
        <ion-label class="header">By Area:</ion-label>
      </ion-item>
      <ion-item v-for="region in regions">
        <ion-label>
          {{ region.name }}
        </ion-label>
        <ion-label>
          {{ region.visitedNumber }}/{{ region.totalNumber }},
          {{ Math.round(region.percentageVisitedByNumber) }}%
        </ion-label>
        <ion-label>
          {{ region.percentageVisitedByArea.toFixed(2) }}%
        </ion-label>
      </ion-item>
    </ion-list>
</template>

<script setup lang="ts">
import {IonItem, IonLabel, IonList} from '@ionic/vue';
import Region from "@/models/Region";

defineProps({
  regions: {
    type: Array<Region>,
    required: true
  }
});
</script>

<style scoped>
.header {
  font-weight: bold;
}
</style>