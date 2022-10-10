<template>
  <div class="pt-4 pb-10 flex flex-col justify-center">
    <!-- Header with a logo -->

    <div class="flex flex-col items-center pt-3">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="pt-2">Welcome in Vue application!</div>
    </div>

    <!-- Bank Offers -->

    <div class="mt-5 flex justify-center w-min-1/2">
      <button
        type="button"
        @click="onBankOffers"
        class="px-2 py-1 text-xl font-medium rounded-md border-2 border-brand-link text-white bg-brand-green bg-opacity-80"
      >
        Fetch and show bank offers
      </button>
    </div>
    <div class="mt-5">
      <hr class="h-px border-0 bg-brand-green" />
    </div>

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
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

import Select from '@/components/ui/select/Select.vue';
import Select2 from '@/components/ui/select2/Select2.vue';
import Slider from '@/components/ui/Slider.vue';
import type { ISelectOption } from '@/components/ui/select/ISelectOption';
import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';

const router = useRouter();

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

const onBankOffers = () => {
  router.push({ name: 'bank-offers-view' });
};
</script>

<style lang="scss" scoped></style>
