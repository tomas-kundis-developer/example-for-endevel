<template>
  <div class="pb-8">
    <div class="flex justify-center mt-1 mb-3 text-2xl font-semibold">Search your individual loan.</div>

    <Filter
      :initial-selected-bank="ALL_BANKS_SELECT_VALUE"
      :initial-selected-fixation="DEFAULT_FIXATION"
      :initial-selected-loan-term="DEFAULT_LOAN_TERM"
      @changeFilter="onChangeFilter"
    />

    <CommunicationError v-if="state.showOffersFetchError" class="mt-5" />

    <OfferList
      :uninsuredOffers="state.filteredUninsuredOffers"
      :insuredOffers="state.filteredInsuredOffers"
      class="mt-5"
    />
  </div>
</template>

<script setup lang="ts">
// Vue

import { inject, reactive } from 'vue';

// external libraries

import _ from 'lodash';

// interfaces, types

import type { IOfferResponse } from '@/@types/integration/be-api/IGetOffersResponse';

// services, utils

import { ELoanProviders, getLoanProvider } from '@/domain-model/loanProviders';
import { getOffersServiceAsync } from '@/services/rest/get-offers/getOffersService';
import { store } from '@/store/store';

// Composables

import { useApiResponses } from '@/store/composables/useApiResponses';

// UI components

import CommunicationError from '@/components/CommunicationError.vue';

// This component

import type { IFilter } from './model/IFilter';
import { DEFAULT_FIXATION, DEFAULT_LOAN_TERM } from './config';
import { ALL_BANKS_SELECT_VALUE } from './services/bankSelectOptionsFactory';
import { interestRateComparator } from './services/interestRateComparator';
import Filter from './Filter.vue';
import OfferList from './OfferList.vue';

const $loading = inject('$loading');

const state = reactive({
  filteredUninsuredOffers: [] as IOfferResponse[],
  filteredInsuredOffers: [] as IOfferResponse[],
  showOffersFetchError: false,
});

// Fetched offers from financial service - original REST response, complete, unfiltered list.
const { getOffersResponse: offers } = useApiResponses();

// Set initial view to show all fetched offers without applied filter.
state.filteredUninsuredOffers = _.cloneDeep(offers?.mortgageInsuredOffers ?? []).sort(interestRateComparator);
state.filteredInsuredOffers = _.cloneDeep(offers?.mortgageInsuredOffers ?? []).sort(interestRateComparator);

// =====================================================================================================================
// Functions, Callbacks
// =====================================================================================================================

const onChangeFilter = async (filterModel: IFilter) => {
  console.log('BankOfferScreen: onChangeFilter:');
  console.log(filterModel);

  state.showOffersFetchError = false;
  const loader = $loading.show();

  try {
    store.apiResponses.getOffersResponse = await getOffersServiceAsync();
  } catch (e) {
    console.error('BankOfferScreen: onChangeFilter(): getOffersServiceAsync() RETURNS WITH AN ERROR!');
    state.showOffersFetchError = true;
    loader.hide();
    return;
  }

  filter(filterModel);
  loader.hide();
};

const filterStage1 = (selectedBank: string) => {
  console.log(`BankOfferScreen: filterStage1(): STAGE 1: selectedBank: ${selectedBank}`);

  const selectedFilterBank = selectedBank;

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

  console.log('BankOfferScreen: filterStage1(): STAGE 1: filtered state.filteredOffers.uninsured');
  console.log(state.filteredUninsuredOffers);
  console.log('BankOfferScreen: filterStage1(): STAGE 1: filtered state.filteredOffers.insured');
  console.log(state.filteredInsuredOffers);
  console.log('BankOfferScreen: filterStage1(): STAGE 1: ... DONE.');
};

const filterStage2 = () => {
  console.log(`BankOfferScreen: filter(): STAGE 2: sorted ascending by interest rate:`);

  state.filteredUninsuredOffers.sort(interestRateComparator);
  state.filteredInsuredOffers.sort(interestRateComparator);

  console.log('BankOfferScreen: filter(): STAGE 2: sorted state.filteredOffers.uninsured');
  console.log(state.filteredUninsuredOffers);
  console.log('BankOfferScreen: filter(): STAGE 2: sorted state.filteredOffers.insured');
  console.log(state.filteredInsuredOffers);
  console.log('BankOfferScreen: filter(): STAGE 2: ... DONE.');
};

const filter = (filterModel: IFilter) => {
  console.log(`BankOfferScreen: filter(): ---------------- START ----------------`);

  filterStage1(filterModel.selectedBank);
  filterStage2();

  console.log(`BankOfferScreen: filter(): ------------ COMPLETE DONE ------------`);
};
</script>

<style lang="scss" scoped></style>
