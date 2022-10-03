<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center pt-3">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="pt-2">Welcome in Vue application!</div>
    </div>
    <div class="mt-5">
      <div>Selected car: {{ selectedCar }}</div>
      <Select :options="cars" v-model="selectedCar" defaultValue="volvo" />
    </div>
    <div class="mt-5">
      <nav class="flex flex-col items-center">
        <div><RouterLink to="/">Home</RouterLink></div>
        <div><a href="https://vuejs.org/" target="_blank">Vue.js Homepage</a></div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Select from '@/components/ui/select/Select.vue';
import type { ISelectOption } from '@/components/ui/select/ISelectOption';
import { ref } from 'vue';

const cars: ISelectOption[] = [
  { description: 'Audi', value: 'audi' },
  { description: 'BMW', value: 'bmw', disabled: true },
  { description: 'Volvo', value: 'volvo', disabled: false },
];

const selectedCar = ref('');
</script>

<style lang="scss" scoped></style>
