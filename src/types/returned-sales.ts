export type ReturnedSalesType = {
  docEntry: number;
  docNum: number;
  cardCode: string;
  cardName: string;
  salesPersonCode: number;
  salesPersonName: string;
  docDate: string;
  docDueDate: string;
  docCurrency: string;
  docTotal: number;
  docTotalFc: number;
  docTotalSys: number;
  paidToDate: number;
  paidSum: number;
  documentStatus: string;
  uTypeOrder: null | string;
  uFirma: null | string;
  uTipdostavka: null | string;
  uJonatildi: string;
  uYopildi: string;
  uRuxsat: string;
  uNarx: null | number | string;
  documentLines: {
    lineNum: number;
    itemCode: string;
    itemDescription: string;
    quantity: number;
    currency: string;
    unitPrice: number;
    price: number;
    priceFC: number;
    priceSC: number;
    lineTotal: number;
    rowTotalFC: number;
    rowTotalSC: number;
    warehouseCode: string;
    warehouseName: string;
    weight1: number;
    uomCode: string;
    uomName: string;
    lineStatus: string;
    uRulon: null | string;
    uList: null | string;
    uKesilgansoni: null | string | string;
  }[];
};
