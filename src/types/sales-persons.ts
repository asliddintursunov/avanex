export type SalesPersonsType = {
  code: number;
  message: string;
  data: {
    salesEmployeeCode: number;
    salesEmployeeName: string;
    active: string;
    employeeID: null | number;
  }[];
};
