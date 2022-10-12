// Vue

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// External libraries and plugins.

// vue-loading-overlay spinner plugin https://openbase.com/js/vue-loading-overlay
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Configuration.

import { vueLoadingConfig } from '@/config/vueLoadingConfig';

// Global static css and dynamic scss.

import './assets/main.css';
import './scss/global.scss';

const app = createApp(App);

app.use(router);
app.use(VueLoading, vueLoadingConfig);

app.mount('#app');
