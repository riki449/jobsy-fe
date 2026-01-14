export type LoginFormValues = {
  email: string;
  password: string;
};

export type UserTypeParams = {
  email: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};

export type LoginResponse = {
  tokens: Tokens;
  default_company_view: number;
};

export type MainAccount = {
  id: string;
  account_name: string;
  email: string;
};

export enum UserType {
  COMPANY = "company",
  USER = "user",
}

export type CheckAccountType = {
  type: UserType;
  main_account: MainAccount;
  linked_accounts: string[];
  default_company_view?: number;
};

export type CheckAccountTypeResponse = {
  data: CheckAccountType;
};
