export interface IGetOffersResponse {
  mortgageInsuredOffers: IOfferResponse[];
  mortgageUninsuredOffers: IOfferResponse[];
  errorMessageInsuredOffers?: string | null;
  errorMessageUninsuredOffers?: string | null;
}

export interface IOfferResponse {
  idOffer: number;
  bankName: string;
  productName: string;
  interestRate: number;
  monthlyPayment: number;
  riskInsurance: number;
  totalFixationCosts: number;
  apr: number;
}
