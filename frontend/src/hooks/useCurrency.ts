import { useCurrencyStore } from '@/store/currencyStore';
import { formatCurrency, getConvertedPrice } from '@/lib/currency';

export function useCurrency() {
  const { currency, setCurrency } = useCurrencyStore();

  const format = (amount: number) => {
    return formatCurrency(amount, currency);
  };

  const getPrice = (amount: number) => {
    return getConvertedPrice(amount, currency);
  };

  return {
    currency,
    setCurrency,
    format,
    getPrice,
  };
}
