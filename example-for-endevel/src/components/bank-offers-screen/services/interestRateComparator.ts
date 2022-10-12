import type { IOfferResponse } from '@/@types/integration/be-api/IGetOffersResponse';

export const interestRateComparator = (offer1: IOfferResponse, offer2: IOfferResponse) => {
  return offer1.interestRate <= offer2.interestRate ? -1 : 1;
};
