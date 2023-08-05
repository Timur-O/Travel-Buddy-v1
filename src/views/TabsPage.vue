<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button href="/app/stats" tab="stats">
          <ion-icon :icon="statsChartOutline" aria-label="Stats Page"/>
        </ion-tab-button>

        <ion-tab-button href="/app/map" tab="map">
          <ion-icon :icon="mapOutline" aria-label="Map Page"/>
        </ion-tab-button>

        <ion-tab-button href="/app/list" tab="list">
          <ion-icon :icon="listOutline" aria-label="List Page"/>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {IonIcon, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {listOutline, mapOutline, statsChartOutline} from 'ionicons/icons';
import {useStore} from "vuex";
import {computed} from "vue";
import {key} from "@/store";

export default {
  name: 'TabsPage',
  components: {IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet},
  async setup() {

    const store = useStore(key);
    const userInfo = computed(() => store.getters.userInfo).value;
    const countriesInfo = computed(() => store.getters.countriesInfo).value;

    if (userInfo == null) {
      await store.dispatch("fetchUserInfo");
    }
    if (countriesInfo == null) {
      await store.dispatch("fetchCountriesInfo");
    }

    return {
      listOutline,
      mapOutline,
      statsChartOutline
    }
  }
}
</script>
