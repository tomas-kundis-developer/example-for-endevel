import { reactive } from 'vue';

import type { IStore } from './IStore';

/**
 * Global store.
 *
 * Data shared among all UI components.
 *
 * Store is a Vue reactive object, so your components and services can react real-time due to data changes in the store.
 */
export const store: IStore = reactive({
  /**
   * Stored responses from API calls dedicated for further processing, or reading.
   */
  apiResponses: {
    getOffersResponse: undefined,
  },
});
