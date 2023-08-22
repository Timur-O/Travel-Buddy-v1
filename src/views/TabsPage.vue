<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button
          href="/app/stats"
          tab="stats"
        >
          <ion-icon
            :icon="statsChartOutline"
            aria-label="Stats Page"
          />
        </ion-tab-button>

        <ion-tab-button
          href="/app/map"
          tab="map"
        >
          <ion-icon
            :icon="mapOutline"
            aria-label="Map Page"
          />
        </ion-tab-button>

        <ion-tab-button
          href="/app/list"
          tab="list"
        >
          <ion-icon
            :icon="listOutline"
            aria-label="List Page"
          />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {IonIcon, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/vue';
import {listOutline, mapOutline, statsChartOutline} from 'ionicons/icons';
import {useStore} from "vuex";
import {computed, ComputedRef} from "vue";
import {key} from "@/store";
import {getCurrentUser} from "vuefire";
import UserInfo from "@/models/UserInfo";
import CountriesInfo from "@/models/CountriesInfo";

export default {
  name: 'TabsPage',
  components: {IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet},
  async setup() {

    const store = useStore(key);
    const userInfo: ComputedRef<UserInfo | null> = computed(() => {
      return store.getters.userInfo
    });
    const countriesInfo: ComputedRef<CountriesInfo | null> = computed(() => {
      return store.getters.countriesInfo
    });

    if (userInfo.value === null) {
      const currentUser = await getCurrentUser();
      await store.dispatch("initUserInfoSubscription", {userId: currentUser?.uid!});
    }
    if (countriesInfo.value === null) {
      await store.dispatch("initCountryInfoSubscription");
    }

    return {
      listOutline,
      mapOutline,
      statsChartOutline
    }
  }
}
</script>
