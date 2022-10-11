<template>
  <div class="pb-8">
    <div class="flex justify-center mt-1 mb-3 text-2xl font-semibold">Search your individual loan.</div>

    <!-- Filter -->

    <div class="p-5 rounded-xl bg-brand-link bg-opacity-20">
      <div class="flex flex-col">
        <div class="flex justify-center text-xl font-semibold">Search parameters</div>
        <div class="mt-5 font-semibold">Loan amount:</div>
        <div class="mt-2 text-xl font-semibold">3 000 000 Kč</div>
        <div class="mt-5 font-semibold">Bank:</div>
        <div>
          <Select2
            v-model="state.selectedBank"
            :canClear="false"
            :defaultValue="ALL_BANKS_SELECT_VALUE"
            :options="bankSelectOptions"
            @change="filterChange"
          />
        </div>
        <div class="mt-5 font-semibold">Fixation:</div>
        <div>
          <Select2
            v-model="state.selectedFixation"
            :canClear="false"
            :defaultValue="DEFAULT_FIXATION"
            :options="fixationSelectOptions"
            @change="filterChange"
          />
        </div>
        <div class="mt-5 font-semibold">Loan Term:</div>
        <div class="mt-1 mb-10">
          <Slider
            :initialValue="DEFAULT_LOAN_TERM"
            :min="LOAN_TERM_MIN"
            :max="LOAN_TERM_MAX"
            @changedValue="filterChange"
          />
        </div>
      </div>
    </div>

    <!-- Bank Offers -->

    <h1 class="flex justify-center mt-5">Search results</h1>
    <h2 class="flex justify-center mt-5">Offers without insurance</h2>
    <OfferItem v-for="(offer, index) in uninsuredOffers" :key="index" :offer="offer" />
    <h2 class="flex justify-center mt-5">Offers with an insurance</h2>
    <OfferItem v-for="(offer, index) in insuredOffers" :key="index" :offer="offer" />
  </div>
</template>

<script setup lang="ts">
// Vue

import { computed, reactive } from 'vue';
import type { ComputedRef } from 'vue';

// interfaces, types

import type { IOfferResponse } from '@/@types/integration/be-api/IGetOffersResponse';

// Composables

import { useApiResponses } from '@/store/composables/useApiResponses';

// services, utils

import { getOffersService } from '@/services/rest/get-offers/getOffersService';

// UI components

import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';
import Select2 from '@/components/ui/select2/Select2.vue';
import Slider from '@/components/ui/Slider.vue';

// This component

import { fixationSelectOptions } from './fixationSelectOptions';
import { bankSelectOptionsFactory, ALL_BANKS_SELECT_VALUE } from './services/bankSelectOptionsFactory';
import OfferItem from './OfferItem.vue';

const state = reactive({
  selectedBank: '',
  selectedFixation: '',
  selectedLoanTerm: null,
});

const DEFAULT_FIXATION = '3';
const DEFAULT_LOAN_TERM = 15;

const LOAN_TERM_MIN = 5;
const LOAN_TERM_MAX = 30;

const bankSelectOptions: ISelectOption2[] = bankSelectOptionsFactory();

const { getOffersResponse: offers } = useApiResponses();

const insuredOffers: ComputedRef<IOfferResponse[]> = computed(() => {
  return offers?.mortgageInsuredOffers ?? [];
});

const uninsuredOffers: ComputedRef<IOfferResponse[]> = computed(() => {
  return offers?.mortgageUninsuredOffers ?? [];
});

// TODO 2022-10-11 TOKU: CONTINUE HERE - EXTRACT AS COMPLEX FILTER PIPELINE.
// TODO 2022-10-11 TOKU: CONTINUE HERE - Add v-model also for Slider?.
const filterChange = (value: string) => {
  console.log(`BankOfferScreen: onBankSelected(): value: ${value}`);
  console.log(`BankOfferScreen: state:`);
  console.log(state);
  // just a scratch, improve!
  offers.mortgageUninsuredOffers = offers?.mortgageUninsuredOffers.filter(
    (offer) => offer.bankName === 'Česká spořitelna',
  ) ?? [];
};
</script>

<style lang="scss" scoped>
h1 {
  @apply text-xl font-semibold;
}

h2 {
  @apply text-lg font-semibold;
}
</style>
