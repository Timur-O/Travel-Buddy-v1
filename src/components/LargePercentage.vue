<template>
  <div class="large-percentage-container">
    <h1 class="large-percentage" :class="color">{{ percentage.toFixed(0) }}%</h1>
    <h5 class="large-percentage-desc">{{ title }}</h5>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  direction: {
    type: String,
    required: true,
    validator(value: string) {
      return ['row', 'row-reverse'].includes(value)
    }
  },
  color: {
    type: String,
    required: true,
    validator(value: string) {
      return ['ion-color-primary', 'ion-color-secondary'].includes(value)
    }
  }
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
</style>