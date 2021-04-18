import { _formatCurrencyAmount } from '../FormatCurrency';

describe('should help with formatting currencies', () => {
  it('should format currencies of wide variety', () => {
    const formattedEuro = _formatCurrencyAmount('EUR', 100);
    const formattedPound = _formatCurrencyAmount('GBP', 120);
    const formattedRupee = _formatCurrencyAmount('IDR', 120);
    expect(formattedEuro).toBe('€100.00');
    expect(formattedPound).toBe('£120.00');
    expect(formattedRupee).toEqual('Rp\xa0120,00');
  });
});
