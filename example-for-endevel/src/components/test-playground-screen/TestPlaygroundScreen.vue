<template>
  <div class="pb-10">
    <!-- UI Form's component playground -->

    <div class="mt-5">
      <div>Selected car: {{ selectedCar }}</div>
      <Select v-model="selectedCar" :options="cars" defaultValue="volvo" />
      <Select v-model="selectedCar" :options="cars" placeholder="Select a car" />
    </div>
    <div class="mt-5">
      <div>Selected car 2: {{ selectedCar2 }}</div>
      <Select2 v-model="selectedCar2" :options="cars2" placeholder="Select a car" />
      <Select2 v-model="selectedCar2" :options="cars2" defaultValue="volvo" />
      <Select2 v-model="selectedCar2" :options="cars2" defaultValue="volvo" disabled />
    </div>
    <div class="mt-5">
      <Slider :initialValue="10" :min="5" :max="15" />
    </div>
  </div>
</template>

<script setup lang="ts">
// UI components

import type { ISelectOption } from '@/components/ui/select/ISelectOption';
import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';
import Select from '@/components/ui/select/Select.vue';
import Select2 from '@/components/ui/select2/Select2.vue';
import Slider from '@/components/ui/Slider.vue';
import { ref } from 'vue';

const cars: ISelectOption[] = [
  { description: 'Audi', value: 'audi' },
  { description: 'BMW', value: 'bmw', disabled: true },
  { description: 'Volvo', value: 'volvo', disabled: false },
];

const cars2: ISelectOption2[] = [
  { label: 'Audi', value: 'audi' },
  { label: 'BMW', value: 'bmw', disabled: true },
  { label: 'Volvo', value: 'volvo' },
];

const selectedCar = ref('');
const selectedCar2 = ref('');
</script>

<style lang="scss" scoped></style>
