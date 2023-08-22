<template>
  <ion-page>
    <TopHeader />

    <ion-content :fullscreen="true">
      <div class="container">
        <div class="combined-container">
          <ion-toggle
            :checked="userInfo.includeNonSovereign"
            class="option"
            mode="ios"
            @ion-change="includeNonSovereignChanged"
          >
            Include Non-Sovereign in Statistics
          </ion-toggle>
        </div>

        <div class="combined-container">
          <ion-button
            aria-label="Sign Out Button"
            color="warning"
            @click="store.dispatch('logout')"
          >
            <ion-icon
              :icon="exitOutline"
              class="icon"
              color="primary"
            />
            Sign Out
          </ion-button>

          <ion-button
            id="show-delete-account-modal"
            aria-label="Delete Account Button"
            color="danger"
          >
            <ion-icon
              :icon="trashBinOutline"
              class="icon"
              color="primary"
            />
            Delete Account
          </ion-button>
          <ion-alert
            :buttons="deleteModalButtons"
            header="Are you sure you want to delete your account?"
            trigger="show-delete-account-modal"
            @did-dismiss="($event: any) => { if ($event.detail.role === 'confirm') store.dispatch('deleteAccount') }"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonAlert, IonButton, IonContent, IonIcon, IonPage, IonToggle} from "@ionic/vue";
import TopHeader from "@/components/TopHeader.vue";
import {useStore} from "vuex";
import {key} from "@/store";
import {exitOutline, trashBinOutline} from "ionicons/icons";
import {computed, ComputedRef} from "vue";
import {usersCollection} from "@/firebase/firebase";
import {getCurrentUser} from "vuefire";
import {doc, updateDoc} from "firebase/firestore";
import UserInfo from "@/models/UserInfo";

const store = useStore(key);
const userInfo: ComputedRef<UserInfo> = computed(() => store.getters.userInfo);

async function includeNonSovereignChanged() {
  const newValue = !userInfo.value.includeNonSovereign;

  const currentUser = await getCurrentUser();
  await updateDoc(doc(usersCollection, currentUser?.uid), {
    includeNonSovereign: newValue,
  });
}

const deleteModalButtons = [
  {
    text: 'Cancel',
    role: 'cancel'
  },
  {
    text: 'Yes',
    role: 'confirm'
  },
];
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

.combined-container {
  display: flex;
  flex-direction: column;
}
</style>