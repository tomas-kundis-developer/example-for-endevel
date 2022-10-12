// interfaces, types

import type { IGetOffersResponse } from '@/@types/integration/be-api/IGetOffersResponse';

// utils

import { thousandSeparatorUs } from '@/utils/thousandSeparator';
import { randomGen } from '@/utils/randomGen';

// this component

import { mock_randGenError } from './mock_errors';
import mock_response1 from './mock_getOffersResponse1.json';
import mock_response2 from './mock_getOffersResponse2.json';

export const getOffersService = (): IGetOffersResponse => {
  console.log('getOffersService(): Waiting for server to reply ...');
  console.log('getOffersService(): OK (mocked data)');

  switch (randomGen(1, 2)) {
    case 1:
      return mock_response1;
    case 2:
      return mock_response2;
    default:
      return mock_randGenError;
  }
};

export const getOffersServiceAsync = (): Promise<IGetOffersResponse> =>
  new Promise((resolve, reject) => {
    const generatedTimeoutMs = randomGen(2.5, 4) * 1000;

    console.log('getOffersServiceAsync(): Waiting for server to reply (mocked data) ...');
    setTimeout(() => {
      console.log(`getOffersServiceAsync(): ... DONE (after ${thousandSeparatorUs(generatedTimeoutMs)} ms).`);

      // TODO 2022-10-10 TOKU: Add error state simulation.
      switch (randomGen(1, 2)) {
        case 1:
          resolve(mock_response1);
          break;
        case 2:
          resolve(mock_response2);
          break;
        default:
          reject(mock_randGenError);
      }
    }, generatedTimeoutMs);
  });
