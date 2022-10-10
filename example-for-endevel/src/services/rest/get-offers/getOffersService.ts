// utils

import { randomGen } from '@/utils/randomGen';

// this component

import mock_response1 from './mock_getOffersResponse1.json';
import mock_response2 from './mock_getOffersResponse2.json';

export const getOffersService = () => {
  console.log('getOffersService(): Waiting for server to reply ...');
  console.log('getOffersService(): OK (mocked data)');

  // TODO 2022-10-10 TOKU: Add error state simulation.
  switch (randomGen(1, 2)) {
    case 1:
      return mock_response1;
    case 2:
      return mock_response2;
  }

  return mock_response1;
};
