<template>
  <ion-card>
    <ion-accordion :expanded="true">
      <ion-item slot="header">
        <ion-card-header>
          <ion-card-title>{{ region.name }}</ion-card-title>
          <ion-card-subtitle>
            {{ region.visitedNumber }} / {{ region.totalNumber }} Countries Visited ({{ region.percentageVisitedByNumber.toFixed(2) }}%)
          </ion-card-subtitle>
        </ion-card-header>
      </ion-item>

      <div slot="content" mode="ios">
        <ion-list lines="inset">
          <ion-item v-for="country in region.countries">
            <ion-label>
              <ion-checkbox justify="space-between" :checked="country.visited"
                            @ionChange="() => countryVisitedChanged(country)">
                <p class="flag">{{ country.flag }}</p>
                <div class="name-and-area-container">
                  {{ country.name }}
                  <p class="sub-label">{{ country.area }} km<sup>2</sup></p>
                </div>
              </ion-checkbox>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-accordion>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonAccordion
} from '@ionic/vue';
import Region from "@/models/Region";
import Country from "@/models/Country";

defineProps({
  region: Region
});

function countryVisitedChanged(country: Country) {
  console.log(country);
}

</script>

<style scoped>
.flag {
  display: inline-block;
  font-size: var(--size) !important;
  margin-right: 1rem !important;
}

.name-and-area-container {
  display: inline-block;
}

.sub-label {
  color: var(--ion-color-medium);
}

ion-checkbox {
  --size: 32px;
  --checkbox-background-checked: var(--ion-item-background);
  --checkmark-color: var(--ion-color-tertiary);
}

ion-checkbox::part(container) {
  border-radius: 6px;
  border: 2px solid;
}
</style>