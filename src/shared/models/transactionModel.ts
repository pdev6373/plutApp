// Generated by https://quicktype.io

import { BankAccountModel } from "./bankaccountModel";

export interface SellGiftCardModel {
  userId: string;
  bankAccountId: string;
  giftCardId: string;
  declaredAmount: number;
  quoteCurrency?: string;
  baseCurrency?: string;
  giftCardUrl: string;
}

export interface TransactionModel {
  bankAccount: BankAccountModel;
  bankAccountId: string;
  transactionCategory: string;
  amount: number;
  currencyCode: string;
  userId: string;
  transactionStatus: string;
  giftCardExchanges: GiftCardExchange[];
}

export interface GiftCardExchange {
  transactionId: string;
  baseCurrencyCode: string;
  quoteCurrencyCode: string;
  amountInCard: number;
  declaredAmount: number;
  amountRecieved: number;
  giftCardUrl: string;
  giftCardId: string;
  giftCardRate: null;
  id: string;
  createdAt: Date;
}
