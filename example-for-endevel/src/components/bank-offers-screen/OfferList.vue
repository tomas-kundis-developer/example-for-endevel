<template>
  <div>
    <h1 class="flex justify-center">Search results</h1>

    <!-- With insurance. -->
    <h2 class="flex justify-center mt-5">Offers without insurance</h2>
    <OfferItem v-for="(offer, index) in props.uninsuredOffers" :key="index" :offer="offer" />

    <!-- Without insurance. -->
    <h2 class="flex justify-center mt-5">Offers with an insurance</h2>
    <OfferItem v-for="(offer, index) in props.insuredOffers" :key="index" :offer="offer" />
  </div>
</template>

<script setup lang="ts">
import type { IOfferResponse } from '@/@types/integration/be-api/IGetOffersResponse';

import OfferItem from './OfferItem.vue';

const props = defineProps<{
  uninsuredOffers: IOfferResponse[];
  insuredOffers: IOfferResponse[];
}>();
</script>

<style lang="scss" scoped>
h1 {
  @apply text-xl font-semibold;
}

h2 {
  @apply text-lg font-semibold;
}
</style>
