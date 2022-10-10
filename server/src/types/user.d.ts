export type CreateUser = {
  full_name: string;
  username: string;
  password: string;
  company?: string;
};

export type UpdateOne = {
  full_name?: string;
  username?: string;
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

interface UpdateOneData {
  id: string;
  body: Omit<UpdateOne, "company">;
}

export type FieldsToUpdate = Record<string, string>;
