import { store } from '@/store/store';

export const useApiResponses = () => {
  const { apiResponses } = store;

  return {
    ...apiResponses,
  };
};
