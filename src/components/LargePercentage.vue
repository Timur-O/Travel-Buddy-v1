<template>
  <div class="large-percentage-container">
    <svg
      class="stat-circle"
      width="150"
      viewBox="0 0 20 20"
    >
      <circle
        class="bg"
        cx="10"
        cy="10"
        r="8"
      />
      <circle
        class="progress"
        :class="color + '-stroke'"
        cx="10"
        cy="10"
        r="8"
        :data-percentage="roundedPercentage"
      />
      <text
        x="50%"
        y="55%"
        :class="color + '-fill'"
      >
        {{ roundedPercentage }}%
      </text>
    </svg>
    <h5 class="large-percentage-desc">
      {{ title }}
    </h5>
  </div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef} from "vue";

const props = defineProps({
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
      return ['primary', 'secondary'].includes(value)
    }
  }
});

const roundedPercentage: ComputedRef<number> = computed(() => {
  return Math.round(props.percentage);
});
</script>

<style scoped>
.large-percentage-container {
  display: flex;
  flex-direction: v-bind(direction);
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-items: center;
}

.primary-fill {
  fill: var(--ion-color-primary);
}

.secondary-fill {
  fill: var(--ion-color-secondary);
}

.primary-stroke {
  stroke: var(--ion-color-primary) !important;
}

.secondary-stroke {
  stroke: var(--ion-color-secondary) !important;
}

.stat-circle circle.bg {
  fill: none;
  stroke: var(--ion-color-light-shade);
  stroke-width: 2;
}

.stat-circle circle.progress {
  fill: none;
  stroke-width: 2;
  stroke-dasharray: 51 51;
  stroke-dashoffset: calc(-51 - ((51/100) * v-bind(percentage)));
  stroke-linecap: round;
}

.stat-circle text {
  font-size: 0.25em;
  text-anchor: middle;
}
</style>