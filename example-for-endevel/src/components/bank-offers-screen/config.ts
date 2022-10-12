// Fixation configuration.
import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';

export const DEFAULT_FIXATION = '3';

// Loan term configuration.
export const DEFAULT_LOAN_TERM = 15;
export const LOAN_TERM_MIN = 5;
export const LOAN_TERM_MAX = 30;

export const fixationSelectOptions: ISelectOption2[] = [
  { label: '1 Year', value: '1' },
  { label: '3 Years', value: '3' },
  { label: '5 Years', value: '5' },
  { label: '7 Years', value: '7' },
  { label: '8 Years', value: '8' },
  { label: '10  Years', value: '10' },
];
