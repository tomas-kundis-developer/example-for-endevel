import { envConfig } from '@/config/envConfig';

export const thousandSeparator = (value: number) => {
  return value.toLocaleString(envConfig.locales.thousandSeparator);
};

export const thousandSeparatorUs = (value: number) => {
  return value.toLocaleString('us-US');
};
