import { ELoanProviders } from '@/domain-model/loanProviders';
import type { ISelectOption2 } from '@/components/ui/select2/ISelectOption2';

export const ALL_BANKS_SELECT_VALUE = 'all';

/**
 * Create options object for UI select.
 *
 * Options will contain all banks specified in {@link ELoanProviders} with extra item 'all' at the beginning
 * of the select list.
 * @see ELoanProviders
 */
export const bankSelectOptionsFactory = (): ISelectOption2[] => {
  const selectOptions: ISelectOption2[] = [];

  // First item in select list will be 'all' - when selected, show all financial institutions.
  selectOptions.push({ label: '-- ALL FINANCIAL INSTITUTIONS --', value: ALL_BANKS_SELECT_VALUE });

  // Convert known list of all financial institutions to format for select options.
  Object.keys(ELoanProviders).map((bankId) => {
    selectOptions.push({ label: ELoanProviders[bankId], value: bankId });
  });

  return selectOptions;
};
