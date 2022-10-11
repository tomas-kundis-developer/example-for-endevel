/**
 * Loan provider identifications (ids).
 *
 * Use this enum to identify loan provider in your code.
 */
enum ELoanProviders {
  CSAS = 'Česká spořitelna',
  CSOB = 'Československá obchodní banka',
  HYPOTECNI_BANK = 'Hypoteční banka',
  KB = 'Komerční banka (KB)',
  MBANK = 'mBank',
  MONETA_MONEY_BANK = 'MONETA Money Bank',
  RF_BANK = 'Raiffeisenbank',
  UNICREDIT_BANK = 'UniCredit Bank',
}

// String constants with full loan provider name.

const CSAS_NAME = 'Česká spořitelna';
const CSOB_NAME = 'Československá obchodní banka';
const HYPOTECNI_BANK_NAME = 'Hypoteční banka';
const KB_NAME = 'Komerční banka (KB)';
const MBANK_NAME = 'mBank';
const MONETA_MONEY_BANK_NAME = 'MONETA Money Bank';
const RF_BANK_NAME = 'Raiffeisenbank';
const UNICREDIT_BANK_NAME = 'UniCredit Bank';

/**
 * Loan provider identification map.
 *
 * Use this map if you need map loan provider identification to its full name.
 */
const loanProvidersMap = new Map<ELoanProviders, String>();

loanProvidersMap.set(ELoanProviders.CSAS, CSAS_NAME);
loanProvidersMap.set(ELoanProviders.CSOB, CSOB_NAME);
loanProvidersMap.set(ELoanProviders.HYPOTECNI_BANK, HYPOTECNI_BANK_NAME);
loanProvidersMap.set(ELoanProviders.KB, KB_NAME);
loanProvidersMap.set(ELoanProviders.MBANK, MBANK_NAME);
loanProvidersMap.set(ELoanProviders.MONETA_MONEY_BANK, MONETA_MONEY_BANK_NAME);
loanProvidersMap.set(ELoanProviders.RF_BANK, RF_BANK_NAME);
loanProvidersMap.set(ELoanProviders.UNICREDIT_BANK, UNICREDIT_BANK_NAME);

/**
 * Return descriptive loan provider's name based on its id.
 *
 * <ul>
 * <li>Loan provider's id should be used in form input's values like <Select> etc.</li>
 * <li>Loan provider's descriptive name should be used on the user's screen.</li>
 * </ul>
 *
 * @param id Loan's provider id.
 * @see ELoanProviders
 */
const getLoanProvider = (id: ELoanProviders): string => (loanProvidersMap.get(id) ?? '<unknown>') as string;

export { ELoanProviders, getLoanProvider };
