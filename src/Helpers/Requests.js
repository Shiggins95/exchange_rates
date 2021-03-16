export const _get = async (url) => {
  const request = await fetch(
    `${process.env.REACT_APP_RATES_BASE_URL}${url}`,
  );
  return request.json();
};
