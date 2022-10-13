<template>
  <div class="pt-4 pb-10 flex flex-col justify-center">
    <!-- Header with a logo -->

    <div class="flex flex-col items-center pt-3">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div class="pt-2">Welcome in Vue application!</div>
    </div>

    <!-- Bank Offers -->

    <CommunicationError v-if="showError" class="mt-5" />

    <div class="mt-5 flex justify-center w-min-1/2">
      <button
        type="button"
        @click="onBankOffers"
        class="px-2 py-1 text-xl font-medium rounded-md border-2 border-brand-link text-white bg-brand-green-light"
      >
        Fetch and show bank offers
      </button>
    </div>

    <div class="mt-5 text-sm text-center italic text-brand-green-light">
      This is just simple example application as my reference.<br />
      Its purpose is to present my skill in architecting and developing SPA web application's using the Vue.js
      framework.
    </div>

    <div class="mt-5">
      <hr class="h-px border-0 bg-brand-green" />
    </div>

    <!-- Other -->

    <div class="pt-10">Other:</div>
    <ul class="ml-10 list-disc">
      <li class="text-brand-link">
        <a :href="GIT_HUB_URL_MASTER" target="_blank" rel="noopener noreferrer">Project's Github</a>
      </li>
      <li class="text-brand-link">
        <a :href="GIT_HUB_URL_DEV" target="_blank" rel="noopener noreferrer">Project's Github - Dev branch</a>
        <ul class="ml-10 list-disc font-medium">
          <li>
            <a :href="GIT_HUB_URL_DEV_WELCOME_SCREEN" target="_blank" rel="noopener noreferrer"
              >WelcomeScreen Component</a
            >
          </li>
          <li>
            <a :href="GIT_HUB_URL_DEV_BANK_OFFERS_SCREEN" target="_blank" rel="noopener noreferrer"
              >BankOffersScreen Component</a
            >
          </li>
        </ul>
      </li>
      <li class="text-brand-link">
        <RouterLink :to="{ name: 'test-playground-view' }">Playground for testing components</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Vue
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';

// interfaces, types

import type { IGetOffersResponse } from '@/@types/integration/be-api/IGetOffersResponse';

// config

import { envConfig } from '@/config/envConfig';

// services, utils

import { store } from '@/store/store';
import { getOffersServiceAsync } from '@/services/rest/get-offers/getOffersService';

// UI components

import CommunicationError from '@/components/CommunicationError.vue';

const router = useRouter();

const $loading = inject('$loading');

const showError = ref(false);

const GIT_HUB_URL_MASTER = envConfig.githubUrl;
const GIT_HUB_URL_DEV = `${envConfig.githubUrl}/tree/dev`;
const GIT_HUB_URL_DEV_BANK_OFFERS_SCREEN = `${envConfig.githubUrl}/tree/dev/example-for-endevel/src/components/bank-offers-screen`;
const GIT_HUB_URL_DEV_WELCOME_SCREEN = `${envConfig.githubUrl}/blob/dev/example-for-endevel/src/components/welcome-screen/WelcomeScreen.vue`;

const onBankOffers = async () => {
  showError.value = false;
  const loader = $loading.show();

  try {
    store.apiResponses.getOffersResponse = await getOffersServiceAsync();
  } catch (e) {
    console.error('WelcomeScreen: onBankOffers(): getOffersServiceAsync() RETURNS WITH AN ERROR!');
    console.error('WelcomeScreen: onBankOffers(): error description for uninsured offers:');
    console.error((e as IGetOffersResponse).errorMessageUninsuredOffers);
    console.error('WelcomeScreen: onBankOffers(): error description for insured offers:');
    console.error((e as IGetOffersResponse).errorMessageInsuredOffers);
    console.error('WelcomeScreen: onBankOffers(): exception:');
    console.log(e);
    showError.value = true;
    return;
  } finally {
    loader.hide();
  }

  await router.push({ name: 'bank-offers-view' });
};
</script>

<style lang="scss" scoped></style>
