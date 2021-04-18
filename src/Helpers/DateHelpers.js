export const _getMonths = () => ({
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
});
export const _formatDateForDisplay = (value) => {
  if (!value) {
    return '';
  }
  const month = value.getMonth();
  const date = value.getDate();
  const year = value.getFullYear();
  return `${date}/${month + 1}/${year}`;
};

export const _formatDateForRequest = (date) => {
  const years = date.getFullYear();
  let months = date.getMonth() + 1;
  if (months < 10) {
    months = `0${months}`;
  }
  let days = date.getDate();
  if (days < 10) {
    days = `0${days}`;
  }

  return `${years}-${months}-${days}`;
};

export const _getYearsBetweenDates = (date) => new Date().getFullYear() - date.getFullYear();
