export type ItemsInStockType = {
  itemCode: string;
  itemName: string;
  groupCode: number;
  groupName: string;
  inStockTotal: number;
  orderedTotal: string;
  committedTotal: string | number;
  uoMCode: string;
  uoMName: string;
  documentLines: {
    warehouseCode: string;
    warehouseName: string;
    inStock: number;
    ordered: number;
    weight: number;
  }[];
};
