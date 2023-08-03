<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="stats" href="/stats">
          <ion-icon aria-label="Stats Page" :icon="statsChartOutline" />
        </ion-tab-button>

        <ion-tab-button tab="map" href="/map">
          <ion-icon aria-label="Map Page" :icon="mapOutline" />
        </ion-tab-button>

        <ion-tab-button tab="list" href="/list">
          <ion-icon aria-label="List Page" :icon="listOutline" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import {ellipse, listOutline, mapOutline, square, statsChartOutline, triangle} from 'ionicons/icons';
</script>
