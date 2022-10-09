import { createRouter, createWebHistory } from 'vue-router';

import BankOffersView from '../views/BankOffersView.vue';
import WelcomeView from '../views/WelcomeView.vue';

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
  ],
});

export default router;
