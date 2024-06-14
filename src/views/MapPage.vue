<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div
        id="map"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {IonContent, IonPage} from '@ionic/vue';
import mapboxgl from "mapbox-gl";
import {computed, ComputedRef, onMounted, Ref, ref} from "vue";
import {useStore} from "vuex";
import {key} from "@/store";
import UserInfo from "@/models/UserInfo";

const secretsJson = (typeof process !== 'undefined') && process.env.SECRETS_JSON ?
    JSON.parse(process.env.SECRETS_JSON) :
    await import('./../../secrets.json');

const map: Ref<mapboxgl.Map | null> = ref(null);
mapboxgl.accessToken = secretsJson.mapBox;

// At low zooms, complete a revolution every two minutes.
const secondsPerRevolution = 120;
// Above zoom level 5, do not rotate.
const maxSpinZoom = 3;
// Rotate at intermediate speeds between zoom levels 3 and 5.
const slowSpinZoom = 2;

let userInteracting = false;
let spinEnabled = true;

const nav = new mapboxgl.NavigationControl();

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    projection: 'globe',
    zoom: 1,
    center: [-90, 40]
  });

  map.value.on('style.load', () => {
    map.value!.setFog({}); // Set the default atmosphere style
  });

  // Pause spinning on interaction
  map.value.on('mousedown', () => {
    userInteracting = true;
  });

  // Restart spinning the globe when interaction is complete
  map.value.on('mouseup', () => {
    userInteracting = false;
    spinGlobe();
  });

  // These events account for cases where the mouse has moved
  // off the map, so 'mouseup' will not be fired.
  map.value.on('dragend', () => {
    userInteracting = false;
    spinGlobe();
  });
  map.value.on('pitchend', () => {
    userInteracting = false;
    spinGlobe();
  });
  map.value.on('rotateend', () => {
    userInteracting = false;
    spinGlobe();
  });

  // When animation is complete, start spinning if there is no ongoing interaction
  map.value.on('moveend', () => {
    spinGlobe();
  });

  map.value.addControl(nav, "top-right");

  const store = useStore(key);
  const userInfo: ComputedRef<UserInfo> = computed(() => store.getters.userInfo);

  userInfo.value.countries.un.forEach((country) => {
    if (country.visited) {
      map.value!.addSource(country.code, {
        type: 'geojson',
        // data: '../../node_modules/world-countries/data/' + country.code + '.geo.json'
        data: 'https://raw.githubusercontent.com/mledoze/countries/master/data/' + country.code + '.geo.json'
      });

      map.value!.addLayer({
        id: country.code,
        type: 'fill',
        source: country.code,
        layout: {},
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.8
        }
      });
    }
  })

  // if (userInfo.value.includeNonSovereign) {
  //   userInfo.value.countries.nonSovereign
  // }

  spinGlobe();
});

function spinGlobe() {
  const zoom = map.value!.getZoom();
  if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    let distancePerSecond = 360 / secondsPerRevolution;
    if (zoom > slowSpinZoom) {
      // Slow spinning at higher zooms
      const zoomDif =
          (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
      distancePerSecond *= zoomDif;
    }
    const center = map.value!.getCenter();
    center.lng -= distancePerSecond;
    // Smoothly animate the map over one second.
    // When this animation is complete, it calls a 'moveend' event.
    map.value!.easeTo({ center, duration: 1000, easing: (n: number) => n });
  }
}
</script>

<style scoped>
@import 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css';

#map {
  width: 100%;
  height: 100%;
}
</style>
