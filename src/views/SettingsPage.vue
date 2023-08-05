<template>
  <ion-page>
    <Header/>

    <ion-content :fullscreen="true">
      <div class="container">
        <ion-toggle :checked="userInfo.includeNonSovereign"
                    class="option"
                    mode="ios"
                    @ionChange="includeNonSovereignChanged">
          Include Non-Sovereign in Statistics
        </ion-toggle>
        <ion-button aria-label="Sign Out Button"
                    color="danger"
                    @click="store.dispatch('logout')">
          <ion-icon :icon="exitOutline"
                    class="icon"
                    color="primary"></ion-icon>
          Sign Out
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonButton, IonContent, IonIcon, IonPage, IonToggle} from "@ionic/vue";
import Header from "@/components/Header.vue";
import {useStore} from "vuex";
import {key} from "@/store";
import {exitOutline} from "ionicons/icons";
import {computed} from "vue";
import {usersCollection} from "@/firebase/firebase";
import {getCurrentUser} from "vuefire";
import {doc, updateDoc} from "firebase/firestore";

const store = useStore(key);
const userInfo = computed(() => store.getters.userInfo).value;

async function includeNonSovereignChanged() {
  const newValue = !userInfo.includeNonSovereign;

  const currentUser = await getCurrentUser();
  await updateDoc(doc(usersCollection, currentUser?.uid), {
    includeNonSovereign: newValue,
  });
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