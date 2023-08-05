<template>
  <ion-page>
    <Header/>

    <ion-content :fullscreen="true">
      <h2 class="greeting">Hi {{ name }}! You've travelled to</h2>

      <LargePercentage :percentage="world.percentageVisitedByNumber"
                       color="primary"
                       direction="row"
                       title="of countries!"/>
      <LargePercentage :percentage="world.percentageVisitedByArea"
                       color="secondary"
                       direction="row-reverse"
                       title="By area, that's"/>

      <h3 class="closer-look">Let's take a closer look:</h3>

      <RegionSummaryList :regions="worldRegions"/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonContent, IonPage} from '@ionic/vue';
import Header from "@/components/Header.vue";
import LargePercentage from "@/components/LargePercentage.vue";
import RegionSummaryList from "@/components/RegionSummaryList.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import World from "@/models/World";
import {key} from "@/store";
import Region from "@/models/Region";

const store = useStore(key);
const userInfo = computed(() => store.getters.userInfo).value;

const name = userInfo.name.substring(0, userInfo.name.indexOf(" "));

let world: World;
if (userInfo.includeNonSovereign) {
  world = computed(() => store.getters.wholeWorld).value;
} else {
  world = computed(() => store.getters.sovereignWorld).value;
}
let worldRegions: Array<Region> = world.regions.sort((a, b) => {
  return b.visitedNumber - a.visitedNumber
});
</script>

<style scoped>
.greeting {
  text-align: center;
  margin-top: 1.3em;
}

.closer-look {
  text-align: center;
  font-family: 'Engebrechtre', sans-serif;
  padding-bottom: 0.3em;
  margin: 1em;
  border-bottom: 1px solid;
}
</style>