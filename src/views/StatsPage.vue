<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true">
      <h2 class="greeting">Hi {{ name }}! You've travelled to</h2>

      <LargePercentage title="of countries!" :percentage="33.34" direction="row" color="primary"/>
      <LargePercentage title="By area, that's" :percentage="100.112312" direction="row-reverse" color="secondary" />

      <h3 class="closer-look">Let's take a closer look:</h3>

      <RegionSummaryList :regions="regions"/>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';
import Header from "@/components/Header.vue";
import LargePercentage from "@/components/LargePercentage.vue";
import RegionSummaryList from "@/components/RegionSummaryList.vue";
import Region from "@/models/Region";
import Country from "@/models/Country";

// TODO - Remove Test Code
// TODO - Sort Regions by Percentage
let name = "Timur";
const regions = [
  new Region("Region 1", [
    new Country("Canada", "🇨🇦", 100, false),
    new Country("Not Canada", "🇨🇦", 400, true)
  ]),
  new Region("Region 2", [
    new Country("France", "🇨🇦", 100, true),
    new Country("U.S.A", "🇨🇦", 10000, true)
  ])
]
</script>

<style scoped>
.greeting {
  text-align: center;
  margin-top: 1.3em;
}

.closer-look {
  text-align: center;
  font-style: oblique;
}
</style>