<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true">
      <ion-accordion-group :multiple="true">
        <RegionList v-for="region in regions" :region="region" />
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {IonPage, IonContent, IonAccordionGroup} from '@ionic/vue';
import Header from "@/components/Header.vue";
import RegionList from "@/components/RegionList.vue";
import Region from "@/models/Region";
import Country from "@/models/Country";

// TODO - Remove Test Code
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
