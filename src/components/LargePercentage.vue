<template>
  <div class="large-percentage-container">
    <h1 class="large-percentage" :class="color">{{ percentage.toFixed(0) }}%</h1>
    <h5 class="large-percentage-desc">{{ title }}</h5>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  percentage: Number,
  direction: String,
  color: String
});
</script>

<style scoped>
.large-percentage-container {
  display: flex;
  flex-direction: v-bind(direction);
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: baseline;
}

.large-percentage {
  font-size: 5em;
}

.primary {
  color: var(--ion-color-primary);
}

.secondary {
  color: var(--ion-color-secondary);
}
</style>