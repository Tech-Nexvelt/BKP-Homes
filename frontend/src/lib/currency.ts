import { CURRENCIES } from './constants';

type CurrencyCode = 'INR' | 'USD' | 'AED';

export function formatCurrency(amount: number, currencyCode: CurrencyCode = 'INR'): string {
  const currency = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];
  const converted = amount * currency.rate;

  if (currencyCode === 'INR') {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(converted);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(converted);
}

export function getConvertedPrice(amount: number, currencyCode: CurrencyCode = 'INR'): number {
  const currency = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];
  return Math.round(amount * currency.rate);
}

export { type CurrencyCode };
