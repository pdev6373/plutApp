export interface GiftCardRateModel {
  id: string;
  createdAt: string;
  name: string;
  description: string;
  imageUrl: string;
  rates: RateModel[];
}

export interface RateModel {
  rate: number;
  maxValue: number;
  minValue: number;
  baseCurrencyCode: string;
  quoteCurrencyCode: string;
  id: string;
  giftCardId: string;
  createdAt: string;
  description: string;
}
