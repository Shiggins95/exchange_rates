import * as DateHelpers from '../DateHelpers';

describe('should help with formatting dates', () => {
  it('should format date into a string if value exists', () => {
    const date = new Date(2021, 10, 30);
    const formatted = DateHelpers._formatDateForDisplay(date);
    expect(formatted).toBe('30/11/2021');
  });
  it('should return empty string if no value is provided for formatting', () => {
    const formatted = DateHelpers._formatDateForDisplay();
    expect(formatted).toBe('');
  });
  it('should format date correctly for making requests', () => {
    const date = new Date(2022, 10, 24);
    const formatted = DateHelpers._formatDateForRequest(date);
    expect(formatted).toBe('2022-11-24');
  });
  it('should pad 0\'s to numbers when formatting if single digit', () => {
    const date1 = new Date(2022, 1, 7);
    const date2 = new Date(2022, 6, 9);
    const date3 = new Date(2022, 9, 10);
    const formatted1 = DateHelpers._formatDateForRequest(date1);
    const formatted2 = DateHelpers._formatDateForRequest(date2);
    const formatted3 = DateHelpers._formatDateForRequest(date3);
    expect(formatted1).toBe('2022-02-07');
    expect(formatted2).toBe('2022-07-09');
    expect(formatted3).toBe('2022-10-10');
  });
});
