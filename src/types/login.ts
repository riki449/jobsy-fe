export type LoginFormValues = {
  email: string;
  password: string;
};

export type Tokens = {
  access: string;
  refresh: string;
};

export type LoginResponse = {
  tokens: Tokens;
  default_company_view: number;
};
