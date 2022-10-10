<template>
  <div class="mt-5 px-2 py-1 border-2 border-brand-green rounded-xl bg-gray-light">
    <div class="flex flex-col gap-4">
      <div class="flex fle-row justify-between">
        <div class="text-gray">Banka</div>
        <div class="text-lg font-semibold italic text-brand-green">{{ props.offer.bankName }}</div>
      </div>
      <div class="flex fle-row justify-between">
        <div class="font-semibold text-gray">Oficiální úroková sazba</div>
        <div class="font-bold">{{ props.offer.interestRate }} % ročně</div>
      </div>
      <div class="flex fle-row justify-between">
        <div class="text-gray">Měsíční splátka od</div>
        <div>{{ props.offer.monthlyPayment }} Kč</div>
      </div>
      <div class="flex fle-row justify-between">
        <div class="text-gray">RPSN</div>
        <div>{{ props.offer.apr }} %</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOfferResponse } from '@/services/rest/get-offers/IGetOffersResponse';

const props = defineProps<{
  offer: IOfferResponse;
}>();
</script>

<style lang="scss" scoped></style>
