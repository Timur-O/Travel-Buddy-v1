<template>
  <ion-page>
    <Header />

    <ion-content :fullscreen="true">
      <div class="container">
        <ion-toggle :checked="userInfo.includeNonSovereign" @ionChange="includeNonSovereignChanged" mode="ios">
          Include Non-Sovereign States
        </ion-toggle>
        <ion-button color="danger" aria-label="Sign Out Button" @click="store.dispatch('logout')">
          <ion-icon color="primary" :icon="exitOutline" class="icon"></ion-icon>Sign Out
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonIcon, IonPage, IonButton, IonToggle } from "@ionic/vue";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";
import { key } from "@/store";
import { exitOutline } from "ionicons/icons";
import { computed } from "vue";

const store = useStore(key);
const userInfo = computed(() => store.getters.userInfo).value;

function includeNonSovereignChanged() {
  console.log("Non-Sovereign Changed!");
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
}
.icon {
  margin-right: 10px;
}
</style>