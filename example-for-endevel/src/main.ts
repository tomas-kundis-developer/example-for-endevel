// Vue

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// External libraries and plugins.

// vue-loading-overlay spinner plugin https://openbase.com/js/vue-loading-overlay
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// Font awesome icon component.
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Configuration.

import { vueLoadingConfig } from '@/config/vueLoadingConfig';

// Services.

import { fontAwesomeInitialization } from '@/services/font-awesome-initialization';

// Global static css and dynamic scss.

import './assets/main.css';
import './scss/global.scss';

fontAwesomeInitialization();

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(VueLoading, vueLoadingConfig);

app.mount('#app');
