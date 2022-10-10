<template>
  <div>
    <div class="flex items-center gap-4 select-none">
      <!-- TODO 2022-10-04 TOKU: Replace +/- with Font Awesome  -->
      <div><button @click="onMinus" class="slider-button">-</button></div>
      <div class="w-full">
        <VueSlider
          v-model="formValue"
          :adsorb="true"
          :interval="incrementInterval"
          :lazy="true"
          :max="consolidatedMax"
          :min="consolidatedMin"
          tooltip="always"
          tooltipPlacement="bottom"
          @change="onVueSliderChange"
        />
      </div>
      <!-- TODO 2022-10-04 TOKU: Replace +/- with Font Awesome  -->
      <div><button @click="onPlus" class="slider-button">+</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

const props = defineProps<{
  initialValue?: number;
  max: number;
  min: number;
}>();

const emit = defineEmits(['changed-value']);

/**
 * Min, max properties check.
 *
 * * Min will be always minimal value, even if set to bigger value than max.
 * * Max will be always maximal value, even if set to smaller value than min.
 */
const { consolidatedMin, consolidatedMax } = (() => {
  let consolidatedMin = props.min;
  let consolidatedMax = props.max;

  if (consolidatedMin > consolidatedMax) {
    consolidatedMin = consolidatedMax;
    consolidatedMax = props.min;
  }

  return {
    consolidatedMin,
    consolidatedMax,
  };
})();

const formValue = ref(props.initialValue ?? props.min);
const incrementInterval = 1;

const isNotMax = () => formValue.value !== consolidatedMax;
const isNotMin = () => formValue.value !== consolidatedMin;

const onMinus = () => {
  if (isNotMin()) {
    formValue.value -= 1;
    emit('changed-value', formValue.value);
  }
};

const onPlus = () => {
  if (isNotMax()) {
    formValue.value += 1;
    emit('changed-value', formValue.value);
  }
};

const onVueSliderChange = (value: number) => {
  emit('changed-value', value);
};
</script>

<style lang="scss" scoped>
.slider-button {
  @apply m-0 px-2 py-0.5 rounded-md text-slider-btn-primary bg-slider-btn-secondary hover:bg-opacity-60;
}
</style>