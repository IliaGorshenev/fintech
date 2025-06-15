import { BCN, CHF, CNY, CURRENCY_COLORS, ERC20, ETH, EUR, GBP, TRC20, USDB, USDW } from '@/icons/currencies';
import { CurrencyTicker } from '@/pages/Main/consts';
export const getCurrencyColor = (ticker: CurrencyTicker) => {
  return `var(--${ticker.toLowerCase()}-color)`;
};
export const getCurrencyIcon = (ticker: CurrencyTicker) => {
  const color = CURRENCY_COLORS[ticker] || CURRENCY_COLORS.DEFAULT;

  switch (ticker) {
    case 'BCN':
      return { icon: <BCN />, color };
    case 'ETH':
      return { icon: <ETH />, color };
    case 'ERC20':
      return { icon: <ERC20 />, color };
    case 'TRC20':
      return { icon: <TRC20 />, color };
    case 'USDW':
      return { icon: <USDW />, color };
    case 'USDB':
      return { icon: <USDB />, color };
    case 'EUR':
      return { icon: <EUR />, color };
    case 'GBP':
      return { icon: <GBP />, color };
    case 'CHF':
      return { icon: <CHF />, color };
    case 'CNY':
      return { icon: <CNY />, color };
    default:
      return { icon: ticker.charAt(0), color };
  }
};
