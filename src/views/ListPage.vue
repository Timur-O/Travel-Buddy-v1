<template>
  <ion-page>
    <TopHeader />

    <ion-content :fullscreen="true">
      <ion-accordion-group :multiple="true">
        <RegionList
          v-for="region in sovereignRegions"
          :key="region.name.toString()"
          :region="region"
        />

        <ion-card>
          <ion-accordion>
            <ion-item slot="header">
              <ion-card-header>
                <ion-card-title>Non-Sovereign States</ion-card-title>
                <ion-card-subtitle>
                  {{ nonSovereignWorld.visitedNumber }} / {{ nonSovereignWorld.totalNumber }}
                  Countries Visited ({{ nonSovereignWorld.percentageVisitedByNumber.toFixed(2) }}%)
                </ion-card-subtitle>
              </ion-card-header>
            </ion-item>

            <!-- Statistics Exclusion Warning -->
            <div slot="content">
              <ion-card v-if="!userInfo.includeNonSovereign">
                <ion-accordion
                  :toggle-icon="informationCircleOutline"
                  readonly
                >
                  <ion-item
                    slot="header"
                    color="warning"
                  >
                    <ion-card-header>
                      <ion-card-subtitle class="ion-text-justify">
                        Non-sovereign states are currently excluded from statistics.
                        If you prefer to include them, you can enable this in the settings.
                      </ion-card-subtitle>
                    </ion-card-header>
                  </ion-item>
                </ion-accordion>
              </ion-card>

              <RegionList
                v-for="region in nonSovereignRegions"
                :key="region.name.toString()"
                :region="region"
              />
            </div>
          </ion-accordion>
        </ion-card>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonAccordion,
  IonAccordionGroup,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonItem,
  IonPage
} from '@ionic/vue';
import TopHeader from "@/components/TopHeader.vue";
import RegionList from "@/components/RegionList.vue";
import Region from "@/models/Region";
import World from "@/models/World";
import {computed, ComputedRef} from "vue";
import {key} from "@/store";
import {useStore} from "vuex";
import {informationCircleOutline} from "ionicons/icons";
import UserInfo from "@/models/UserInfo";

const store = useStore(key);
const userInfo: ComputedRef<UserInfo> = computed(() => store.getters.userInfo);
const sovereignWorld: ComputedRef<World> = computed(() => store.getters.sovereignWorld);
const nonSovereignWorld: ComputedRef<World> = computed(() => store.getters.nonSovereignWorld);

const sovereignRegions: ComputedRef<Region[]> = computed(() => {
  return [...sovereignWorld.value.regions].sort((a, b) => {
    return b.visitedNumber - a.visitedNumber
  });
});

const nonSovereignRegions: ComputedRef<Region[]> = computed(() => {
  return [...nonSovereignWorld.value.regions].sort((a, b) => {
    return b.visitedNumber - a.visitedNumber
  });
});
</script>