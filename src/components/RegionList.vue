<template>
  <ion-card>
    <ion-accordion>
      <ion-item slot="header">
        <ion-card-header>
          <ion-card-title>{{ region.name }}</ion-card-title>
          <ion-card-subtitle>
            {{ region.visitedNumber }} / {{ region.totalNumber }} Countries Visited
            ({{ region.percentageVisitedByNumber.toFixed(2) }}%)
          </ion-card-subtitle>
        </ion-card-header>
      </ion-item>

      <div slot="content">
        <ion-list lines="inset">
          <ion-item v-for="country in region.countries">
            <ion-label>
              <ion-checkbox :checked="country.visited"
                            justify="space-between"
                            mode="ios"
                            @ionChange="() => countryVisitedChanged(country)">
                <p class="flag">{{ country.flag ? country.flag : '🚫' }}</p>
                <div class="name-and-area-container">
                  {{
                    country.name.substring(0, Math.min(country.name.length, 25)) + (country.name.length > 25 ? '...' : '')
                  }}
                  <p class="ion-color-medium">
                    {{ country.area.toLocaleString() }} km<sup>2</sup>
                    <ion-text v-if="country.type == 'nonUn'" color="secondary">
                      , Non-UN Member
                    </ion-text>
                  </p>
                </div>
              </ion-checkbox>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-accordion>
  </ion-card>
</template>

<script lang="ts" setup>
import {
  IonAccordion,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonItem,
  IonLabel,
  IonList,
  IonText
} from '@ionic/vue';
import Region from "@/models/Region";
import Country from "@/models/Country";
import {getCurrentUser} from "vuefire";
import {doc, updateDoc} from "firebase/firestore";
import {usersCollection} from "@/firebase/firebase";
import {computed} from "vue";
import {useStore} from "vuex";
import {key} from "@/store";

defineProps({
  region: {
    type: Region,
    required: true
  }
});

const store = useStore(key);
const userInfo = computed(() => store.getters.userInfo).value;

async function countryVisitedChanged(country: Country) {
  const newValue = !country.visited.valueOf();
  const countryObj = userInfo.countries[country.type].find(c => c.code == country.code);
  if (countryObj) {
    countryObj.visited = newValue;
  } else {
    userInfo.countries[country.type].push({
      code: country.code,
      visited: newValue
    });
  }

  const currentUser = await getCurrentUser();
  await updateDoc(doc(usersCollection, currentUser?.uid), {
    countries: userInfo.countries,
  });
}
</script>

<style scoped>
.flag {
  display: inline-block;
  font-size: var(--size) !important;
  margin-right: 1rem !important;
}

.name-and-area-container {
  display: inline-block;
  text-overflow: unset !important;
}

ion-checkbox {
  --size: 32px;
  --checkbox-background-checked: var(--ion-color-primary-shade);
  --checkmark-color: var(--ion-color-light);
  --checkmark-width: 2px;
}

ion-checkbox::part(container) {
  border-radius: 6px;
  border: 2px solid;
}
</style>