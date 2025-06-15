// Add this at the top of your file or in a separate types file
// In src/types/index.ts or src/pages/Main/consts.ts
export type CurrencyTicker = 'BCN' | 'ETH' | 'ERC20' | 'TRC20' | 'USDW' | 'USDB' | 'EUR' | 'GBP' | 'CHF' | 'CNY' | 'DEFAULT';
export const currencyData: Array<{
  name: string;
  ticker: CurrencyTicker;
  icon: string;
  buy: string;
  sell: string;
}> = [
  {
    name: 'Bitcoin',
    ticker: 'BCN',
    icon: 'btc_icon.png',
    buy: '7 355 290,92 ₽',
    sell: '7 126 308,33 ₽',
  },
  {
    name: 'Ethereum',
    ticker: 'ETH',
    icon: 'eth_icon.png',
    buy: '132 390,66 ₽',
    sell: '129 645,33 ₽',
  },
  {
    name: 'Tether',
    ticker: 'ERC20',
    icon: 'usdt_icon.png',
    buy: '83,25 ₽',
    sell: '82,47 ₽',
  },
  {
    name: 'Tether',
    ticker: 'TRC20',
    icon: 'usdt_icon.png',
    buy: '83,26 ₽',
    sell: '82,26 ₽',
  },
  {
    name: 'Белый доллар',
    ticker: 'USDW',
    icon: 'dollar_icon.png',
    buy: '100 ₽',
    sell: '96 ₽',
  },
  {
    name: 'Синий доллар',
    ticker: 'USDB',
    icon: 'dollar_icon.png',
    buy: '110 ₽',
    sell: '104 ₽',
  },
  {
    name: 'Евро',
    ticker: 'EUR',
    icon: 'eur_icon.png',
    buy: '96 ₽',
    sell: '95 ₽',
  },
  {
    name: 'Юань',
    ticker: 'CNY',
    icon: 'cny_icon.png',
    buy: '-',
    sell: '-',
  },
  {
    name: 'Фунт',
    ticker: 'GBP',
    icon: 'gbp_icon.png',
    buy: '-',
    sell: '-',
  },
  {
    name: 'Франк',
    ticker: 'CHF',
    icon: 'chf_icon.png',
    buy: '-',
    sell: '-',
  },
];
