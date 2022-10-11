import type { IGetOffersResponse } from '@/@types/integration/be-api/IGetOffersResponse';

export interface IStore {
  apiResponses: {
    getOffersResponse?: IGetOffersResponse;
  };
}
