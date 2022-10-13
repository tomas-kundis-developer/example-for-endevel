import type { IGetOffersResponse } from '@/@types/integration/be-api/IGetOffersResponse';

export const mock_serverError: IGetOffersResponse = {
  mortgageInsuredOffers: [],
  mortgageUninsuredOffers: [],
  errorMessageInsuredOffers: 'error #4432: getOffersService computation error',
  errorMessageUninsuredOffers: 'error #4432: getOffersService computation error',
};

export const mock_randGenError: IGetOffersResponse = {
  mortgageInsuredOffers: [],
  mortgageUninsuredOffers: [],
  errorMessageInsuredOffers: 'getOffersService random generated value out of the range',
  errorMessageUninsuredOffers: 'getOffersService random generated value out of the range',
};
