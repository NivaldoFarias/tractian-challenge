export type CreateUser = {
  full_name: string;
  username: string;
  password: string;
  company?: string;
};

export interface FindOne {
  company: string;
  apiKey: string;
}

export type SignInBody = {
  username: string;
  password: string;
};
