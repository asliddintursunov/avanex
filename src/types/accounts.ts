export type GetMeType = {
  code: number;
  message: string;
  data: {
    employeeId: number;
    firstName: string;
    lastName: string;
    jobTitle: string;
    mobilePhone: null | string;
    active: string;
    salesPersonCode: null | number;
  };
};

export type LoginSuccessType = {
  code: number;
  message: string;
  data: {
    token: string;
    employee: {
      employeeId: number;
      firstName: string;
      lastName: string;
      jobTitle: string;
      mobilePhone: null | string;
      active: string;
      salesPersonCode: null | number;
    };
  };
};

export type LoginRequestType = { login: string; password: string };
