import { ELoanProviders } from '@/domain-model/LoanProviders';
import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';

export const ALL_BANKS_SELECT_VALUE = 'all';

export const bankSelectOptionsFactory = (): ISelectOption2[] => {
  const selectOptions: ISelectOption2[] = [];

  // First entry in select will be 'all' - when selected, show all financial institutions.
  selectOptions.push({ label: '-- ALL FINANCIAL INSTITUTIONS --', value: ALL_BANKS_SELECT_VALUE });

  // Convert known list of all financial institutions to format for select options.
  Object.keys(ELoanProviders).map((bankId) => {
    selectOptions.push({ label: ELoanProviders[bankId], value: bankId });
  });

  return selectOptions;
};
