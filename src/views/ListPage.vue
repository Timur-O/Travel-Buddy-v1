<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true">
      <ion-accordion-group :multiple="true">
        <RegionList v-for="region in sovereignRegions" :region="region" />

        <ion-card>
          <ion-accordion>
            <ion-item slot="header">
              <ion-card-header>
                <ion-card-title>Non-Sovereign States</ion-card-title>
                <ion-card-subtitle>
                  {{ nonSovereignWorld.visitedNumber }} / {{ nonSovereignWorld.totalNumber }} Countries Visited ({{ nonSovereignWorld.percentageVisitedByNumber.toFixed(2) }}%)
                </ion-card-subtitle>
              </ion-card-header>
            </ion-item>

            <!-- Statistics Exclusion Warning -->
            <div slot="content">
              <ion-card v-if="!userInfo.includeNonSovereign">
                <ion-accordion readonly :toggle-icon="informationCircleOutline">
                  <ion-item slot="header" color="warning">
                    <ion-card-header>
                      <ion-card-subtitle class="ion-text-justify">
                        Non-sovereign states are currently excluded from statistics. If you prefer to include them, you can enable this in the settings.
                      </ion-card-subtitle>
                    </ion-card-header>
                  </ion-item>
                </ion-accordion>
              </ion-card>

              <RegionList v-for="region in nonSovereignRegions" :region="region" />
            </div>
          </ion-accordion>
        </ion-card>

      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonAccordionGroup,
  IonItem,
  IonCardTitle,
  IonCard,
  IonAccordion,
  IonCardHeader, IonCardSubtitle
} from '@ionic/vue';
import Header from "@/components/Header.vue";
import RegionList from "@/components/RegionList.vue";
import Region from "@/models/Region";
import World from "@/models/World";
import {computed} from "vue";
import {key} from "@/store";
import {useStore} from "vuex";
import {informationCircleOutline} from "ionicons/icons";

const store = useStore(key);
const userInfo = computed(() => store.getters.userInfo).value;
const sovereignWorld: World = computed(() => store.getters.sovereignWorld).value;
const nonSovereignWorld: World = computed(() => store.getters.nonSovereignWorld).value;
const sovereignRegions: Region[] = sovereignWorld.regions.sort((a, b) => b.visitedNumber - a.visitedNumber);
const nonSovereignRegions: Region[] = nonSovereignWorld.regions.sort((a, b) => b.visitedNumber - a.visitedNumber);
</script>