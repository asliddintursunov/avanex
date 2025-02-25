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
    groupCode: number;
    groupName: string;
    phone1: null | string | number;
    valid: string;
    currentAccountBalance: number;
    currency: string;
    defaultCurrency: string;
  }[];
};

export type BusinessPartnerByCardNameType = {
  cardCode: string;
  cardName: string;
  cardType: string;
  groupCode: number;
  groupName: string;
  phone1: null | string | number;
  valid: string;
  currentAccountBalance: number;
  currency: string;
  defaultCurrency: string;
};
