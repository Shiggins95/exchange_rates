const { _get } = require('../Requests');

describe('should make requests easily', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('finds exchange', async () => {
    // mock fetch using jest-fetch-mock
    fetch.mockResponseOnce(JSON.stringify({ exchangeRates: { CAD: 1.42 } }));
    const { exchangeRates } = await _get();

    expect(JSON.stringify(exchangeRates)).toBe(JSON.stringify({ CAD: 1.42 }));
    expect(exchangeRates.CAD).toBe(1.42);
    // ensure fetch is only called once
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
