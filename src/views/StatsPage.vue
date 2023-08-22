<template>
  <ion-page>
    <TopHeader />

    <ion-content :fullscreen="true">
      <h2 class="greeting">
        Hi {{ name }}! You've travelled to
      </h2>

      <LargePercentage
        :percentage="world.percentageVisitedByNumber"
        color="primary"
        direction="row"
        title="of countries!"
      />
      <LargePercentage
        :percentage="world.percentageVisitedByArea"
        color="secondary"
        direction="row-reverse"
        title="By area, that's"
      />

      <h3 class="closer-look">
        Let's take a closer look:
      </h3>

      <RegionSummaryList :regions="worldRegions" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonContent, IonPage} from '@ionic/vue';
import TopHeader from "@/components/TopHeader.vue";
import LargePercentage from "@/components/LargePercentage.vue";
import RegionSummaryList from "@/components/RegionSummaryList.vue";
import {useStore} from "vuex";
import {computed, ComputedRef} from "vue";
import World from "@/models/World";
import {key} from "@/store";
import Region from "@/models/Region";
import UserInfo from "@/models/UserInfo";

const store = useStore(key);
const userInfo: ComputedRef<UserInfo> = computed(() => store.getters.userInfo);

const name: string = userInfo.value.name.substring(0, userInfo.value.name.indexOf(" "));

const world: ComputedRef<World> = computed(() => {
  if (userInfo.value.includeNonSovereign) {
    return store.getters.wholeWorld;
  } else {
    return store.getters.sovereignWorld;
  }
});

const worldRegions: ComputedRef<Array<Region>> = computed(() => {
  return [...world.value.regions].sort((a, b) => {
    return b.visitedNumber - a.visitedNumber;
  });
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