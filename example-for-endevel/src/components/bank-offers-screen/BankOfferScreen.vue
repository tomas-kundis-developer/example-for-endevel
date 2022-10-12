<template>
  <div class="pb-8">
    <div class="flex justify-center mt-1 mb-3 text-2xl font-semibold">Search your individual loan.</div>

    <Filter
      :initial-selected-bank="ALL_BANKS_SELECT_VALUE"
      :initial-selected-fixation="DEFAULT_FIXATION"
      :initial-selected-loan-term="DEFAULT_LOAN_TERM"
      @changeFilter="onChangeFilter"
    />

    <OfferList
      :uninsuredOffers="state.filteredUninsuredOffers"
      :insuredOffers="state.filteredInsuredOffers"
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

// This component

import type { IFilter } from './model/IFilter';
import { DEFAULT_FIXATION, DEFAULT_LOAN_TERM } from './config';
import { ALL_BANKS_SELECT_VALUE } from './services/bankSelectOptionsFactory';
import { interestRateComparator } from './services/interestRateComparator';
import Filter from './Filter.vue';
import OfferList from './OfferList.vue';

const state = reactive({
  filteredUninsuredOffers: [] as IOfferResponse[],
  filteredInsuredOffers: [] as IOfferResponse[],
});

// Fetched offers from financial service - original REST response, complete, unfiltered list.
const { getOffersResponse: offers } = useApiResponses();

// Set initial view to show all fetched offers without applied filter.
state.filteredUninsuredOffers = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);
state.filteredInsuredOffers = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);

state.filteredUninsuredOffers.sort(interestRateComparator);
state.filteredInsuredOffers.sort(interestRateComparator);

// =====================================================================================================================
// Functions, Callbacks
// =====================================================================================================================

const onChangeFilter = (filterModel: IFilter) => {
  console.log('BankOfferScreen: onChangeFilter:');
  console.log(filterModel);
  filter(filterModel);
};

const filter = (filterModel: IFilter) => {
  console.log(`BankOfferScreen: filter(): ---------------- START ----------------`);

  // Stage 1
  // ===================================================================================================================
  console.log(`BankOfferScreen: filter(): STAGE 1: filterModel.selectedBank: ${filterModel.selectedBank}`);

  const selectedFilterBank = filterModel.selectedBank;

  if (selectedFilterBank === ALL_BANKS_SELECT_VALUE) {
    state.filteredUninsuredOffers = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);
    state.filteredInsuredOffers = _.cloneDeep(offers?.mortgageInsuredOffers ?? []);
  } else {
    state.filteredUninsuredOffers =
      // filter() create a new array.
      offers?.mortgageUninsuredOffers.filter(
        (offer) => offer.bankName === getLoanProvider(ELoanProviders[selectedFilterBank]),
      ) ?? [];

    state.filteredInsuredOffers =
      // filter() create a new array.
      offers?.mortgageInsuredOffers.filter(
        (offer) => offer.bankName === getLoanProvider(ELoanProviders[selectedFilterBank]),
      ) ?? [];
  }

  console.log('BankOfferScreen: filter(): STAGE 1: filtered state.filteredOffers.uninsured');
  console.log(state.filteredUninsuredOffers);
  console.log('BankOfferScreen: filter(): STAGE 1: filtered state.filteredOffers.insured');
  console.log(state.filteredInsuredOffers);
  console.log('BankOfferScreen: filter(): STAGE 1: ... DONE.');

  // Stage 2
  // ===================================================================================================================

  console.log(`BankOfferScreen: filter(): STAGE 2: sorted ascending by interest rate:`);

  state.filteredUninsuredOffers.sort(interestRateComparator);
  state.filteredInsuredOffers.sort(interestRateComparator);

  console.log('BankOfferScreen: filter(): STAGE 2: sorted state.filteredOffers.uninsured');
  console.log(state.filteredUninsuredOffers);
  console.log('BankOfferScreen: filter(): STAGE 2: sorted state.filteredOffers.insured');
  console.log(state.filteredInsuredOffers);
  console.log('BankOfferScreen: filter(): STAGE 2: ... DONE.');
  console.log(`BankOfferScreen: filter(): ------------ COMPLETE DONE ------------`);
};
</script>

<style lang="scss" scoped></style>
