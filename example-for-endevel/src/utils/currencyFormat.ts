import { envConfig } from '@/config/envConfig';

export const currencyFormat = (value: number, fraction: boolean) => {
  const maximumFractionDigits = fraction ? 2 : 0;

  return value.toLocaleString(envConfig.locales.thousandSeparator, {
    style: 'currency',
    currency: envConfig.locales.currency,
    maximumFractionDigits,
  });
};
