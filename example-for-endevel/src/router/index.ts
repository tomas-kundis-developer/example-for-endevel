import { createRouter, createWebHistory } from 'vue-router';

import BankOffersView from '@/views/BankOffersView.vue';
import TestPlaygroundView from '@/views/TestPlaygroundView.vue';
import WelcomeView from '@/views/WelcomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: WelcomeView,
    },
    {
      path: '/bank-offers/',
      name: 'bank-offers-view',
      component: BankOffersView,
    },
    {
      path: '/test-playground/',
      name: 'test-playground-view',
      component: TestPlaygroundView,
    },
  ],
});

router.beforeEach((to, from) => {
  // TODO 2022-10-09 TOKU: Add router's beforeEach global guard.
});

export default router;
