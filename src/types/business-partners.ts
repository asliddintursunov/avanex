export type BusinessPartnersGroupType = {
  code: number;
  message: string;
  data: {
    code: number;
    name: string;
    type: string;
  }[];
};

export type BusinessPartnersType = {
  code: number;
  message: string;
  data: {
    cardCode: string;
    cardName: string;
    cardType: string;
    currency: string;
    currentAccountBalance: number;
    currentAccountBalanceFC: number;
    currentAccountBalanceSys: number;
    defaultCurrency: string;
    groupCode: number;
    groupName: string;
    phone1: string;
    valid: string;
  }[];
};

export type BusinessPartnerByCardNameType = {
  cardCode: string;
  cardName: string;
  cardType: string;
  currency: string;
  currentAccountBalance: number;
  currentAccountBalanceFC: number;
  currentAccountBalanceSys: number;
  defaultCurrency: string;
  groupCode: number;
  groupName: string;
  phone1: string;
  valid: string;
};
