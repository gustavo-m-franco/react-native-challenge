import currencyFormatter from 'currency-formatter';

export const CURRENCY_SYMBOL = 'Bø';

const toPrice = (amount: number) => {
  if (!amount) {
    return `${CURRENCY_SYMBOL} 0.00`;
  }
  return currencyFormatter.format(Math.round(amount) / 100, {
    locale: 'en-GB',
    symbol: CURRENCY_SYMBOL,
  });
};

export default {
  toPrice,
};
