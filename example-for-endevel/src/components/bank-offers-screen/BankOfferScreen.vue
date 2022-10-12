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
            :defaultValue="initialState.selectedBank"
            :options="bankSelectOptions"
            @change="filter"
          />
        </div>
        <div class="mt-5 font-semibold">Fixation:</div>
        <div>
          <Select2
            v-model="state.selectedFixation"
            :canClear="false"
            :defaultValue="initialState.selectedFixation"
            :options="fixationSelectOptions"
            @change="filter"
          />
        </div>
        <div class="mt-5 font-semibold">Loan Term:</div>
        <div class="mt-1 mb-10">
          <Slider
            :initialValue="initialState.selectedLoanTerm"
            :min="LOAN_TERM_MIN"
            :max="LOAN_TERM_MAX"
            @changedValue="onLoanTermChange"
          />
        </div>
      </div>
    </div>

    <!-- Bank Offers -->

    <h1 class="flex justify-center mt-5">Search results</h1>

    <!-- With insurance. -->
    <h2 class="flex justify-center mt-5">Offers without insurance</h2>
    <OfferItem v-for="(offer, index) in state.filteredOffers.uninsured" :key="index" :offer="offer" />

    <!-- Without insurance. -->
    <h2 class="flex justify-center mt-5">Offers with an insurance</h2>
    <OfferItem v-for="(offer, index) in state.filteredOffers.insured" :key="index" :offer="offer" />
  </div>
</template>

<script setup lang="ts">
// Vue

import { reactive, watch } from 'vue';

// interfaces, types

import type { IOfferResponse } from '@/@types/integration/be-api/IGetOffersResponse';

// services, utils

import { ELoanProviders, getLoanProvider } from '@/domain-model/loanProviders';

// Composables

import { useApiResponses } from '@/store/composables/useApiResponses';

// UI components

import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';
import Select2 from '@/components/ui/select2/Select2.vue';
import Slider from '@/components/ui/Slider.vue';

// This component

import { DEFAULT_FIXATION, DEFAULT_LOAN_TERM, LOAN_TERM_MIN, LOAN_TERM_MAX } from './config';
import { fixationSelectOptions } from './config';
import { bankSelectOptionsFactory, ALL_BANKS_SELECT_VALUE } from './services/bankSelectOptionsFactory';
import OfferItem from './OfferItem.vue';

const initialState = {
  selectedBank: ALL_BANKS_SELECT_VALUE,
  selectedFixation: DEFAULT_FIXATION,
  selectedLoanTerm: DEFAULT_LOAN_TERM,
};

const state = reactive({
  selectedBank: ALL_BANKS_SELECT_VALUE,
  selectedFixation: DEFAULT_FIXATION,
  selectedLoanTerm: DEFAULT_LOAN_TERM,
  filteredOffers: {
    uninsured: [] as IOfferResponse[],
    insured: [] as IOfferResponse[],
  },
});

const bankSelectOptions: ISelectOption2[] = bankSelectOptionsFactory();

// Fetched offers from financial service - original REST response, complete, unfiltered list.
const { getOffersResponse: offers } = useApiResponses();

// Set initial view to show all fetched offers without applied filter.
state.filteredOffers.uninsured = offers?.mortgageInsuredOffers ?? [];
state.filteredOffers.insured = offers?.mortgageInsuredOffers ?? [];

// Run filter when fetched offers was updated in store (when these was again fetched from a server
//   during another async. action).
watch(offers, () => {
  console.log('BankOfferScree: watch: store changed: getOffersResponse');
  filter();
});

// =====================================================================================================================
// Functions, Callbacks
// =====================================================================================================================

const onLoanTermChange = (value: number) => {
  state.selectedLoanTerm = value;
  filter();
};

// TODO 2022-10-11 TOKU: CONTINUE HERE - Add v-model also for Slider?.
const filter = () => {
  console.log(`BankOfferScreen: filter(): state: filter values:`);
  console.table(state);

  console.log(`BankOfferScreen: filter(): ------------ FILTER 1 - START: Bank name ------------`);

  state.filteredOffers.uninsured =
    offers?.mortgageUninsuredOffers.filter(
      (offer) => offer.bankName === getLoanProvider(ELoanProviders[state.selectedBank]),
    ) ?? [];

  state.filteredOffers.insured =
    offers?.mortgageInsuredOffers.filter(
      (offer) => offer.bankName === getLoanProvider(ELoanProviders[state.selectedBank]),
    ) ?? [];

  console.log(`BankOfferScreen: filter(): ------------ FILTER 1 - END ------------`);

  console.log(`BankOfferScreen: filter(): ------------ FILTER 2 - START: Sort ascending by interest rate ------------`);

  state.filteredOffers.uninsured.sort((offer1, offer2) => {
    return offer1.interestRate <= offer2.interestRate ? -1 : 1;
  });

  state.filteredOffers.insured.sort((offer1, offer2) => {
    return offer1.interestRate <= offer2.interestRate ? -1 : 1;
  });

  console.log(`BankOfferScreen: filter(): ------------ FILTER 2 - END  ------------`);
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
