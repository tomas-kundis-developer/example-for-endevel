<template>
  <div class="pb-8">
    <div class="flex justify-center mt-1 mb-3 text-2xl font-semibold">Search your individual loan.</div>

    <!-- Filter -->

    <Filter
      :initial-selected-bank="initialState.selectedBank"
      :initial-selected-fixation="initialState.selectedFixation"
      :initial-selected-loan-term="initialState.selectedLoanTerm"
      @changeFilter="onChangeFilter"
    />

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

    <OfferList
      :uninsuredOffers="state.filteredOffers.uninsured"
      :insuredOffers="state.filteredOffers.insured"
      class="mt-5"
    />
  </div>
</template>

<script setup lang="ts">
// Vue

import { reactive } from 'vue';

// external libraries

import _ from 'lodash';

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

import type { IFilter } from '@/components/bank-offers-screen/model/IFilter';
import { fixationSelectOptions, DEFAULT_FIXATION, DEFAULT_LOAN_TERM, LOAN_TERM_MIN, LOAN_TERM_MAX } from './config';
import { bankSelectOptionsFactory, ALL_BANKS_SELECT_VALUE } from './services/bankSelectOptionsFactory';
import { interestRateComparator } from './services/interestRateComparator';
import Filter from './Filter.vue';
import OfferList from './OfferList.vue';

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
state.filteredOffers.uninsured = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);
state.filteredOffers.insured = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);

console.log(`BankOfferScreen: actual state:`);
console.table(state);

// =====================================================================================================================
// Functions, Callbacks
// =====================================================================================================================

const onLoanTermChange = (value: number) => {
  state.selectedLoanTerm = value;
  filter({
    selectedBank: state.selectedBank,
    selectedFixation: state.selectedFixation,
    selectedLoanTerm: state.selectedLoanTerm,
  });
};

const onChangeFilter = (value: IFilter) => {
  console.log('BankOfferScreen: onChangeFilter:');
  console.log(value);
  console.log('---');
  filter(value);
};

const filter = (filterModel: IFilter) => {
  console.log(`BankOfferScreen: filter(): ------------ FILTER 1 - START: Bank name ------------`);

  const selectedFilterBank = filterModel.selectedBank;

  if (selectedFilterBank === ALL_BANKS_SELECT_VALUE) {
    state.filteredOffers.uninsured = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);
    state.filteredOffers.insured = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);
  } else {
    state.filteredOffers.uninsured =
      // Filter create a new array.
      offers?.mortgageUninsuredOffers.filter(
        (offer) => offer.bankName === getLoanProvider(ELoanProviders[selectedFilterBank]),
      ) ?? [];

    state.filteredOffers.insured =
      // Filter create a new array.
      offers?.mortgageInsuredOffers.filter(
        (offer) => offer.bankName === getLoanProvider(ELoanProviders[selectedFilterBank]),
      ) ?? [];
  }

  console.log('BankOfferScreen: filter(): state.filteredOffers.uninsured');
  console.log(state.filteredOffers.uninsured);
  console.log('BankOfferScreen: filter(): state.filteredOffers.insured');
  console.log(state.filteredOffers.insured);
  console.log(`BankOfferScreen: filter(): ------------ FILTER 1 - END ------------`);

  console.log(`BankOfferScreen: filter(): ------------ FILTER 2 - START: Sort ascending by interest rate ------------`);

  state.filteredOffers.uninsured.sort(interestRateComparator);
  state.filteredOffers.insured.sort(interestRateComparator);

  console.log(`BankOfferScreen: filter(): ------------ FILTER 2 - END  ------------`);
};
</script>

<style lang="scss" scoped></style>
