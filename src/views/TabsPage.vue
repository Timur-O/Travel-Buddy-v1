<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="stats" href="/app/stats">
          <ion-icon aria-label="Stats Page" :icon="statsChartOutline" />
        </ion-tab-button>

        <ion-tab-button tab="map" href="/app/map">
          <ion-icon aria-label="Map Page" :icon="mapOutline" />
        </ion-tab-button>

        <ion-tab-button tab="list" href="/app/list">
          <ion-icon aria-label="List Page" :icon="listOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { listOutline, mapOutline, statsChartOutline } from 'ionicons/icons';
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: 'TabsPage',
  components: {IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet},
  async setup() {

    const store = useStore();
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
