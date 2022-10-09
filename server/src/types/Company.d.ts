export type CreateRequestBody = {
  name: string;
};

export type CreateData = {
  name: string;
  apiKey: string;
};

export type FindByNameAndApiKey = {
  company: string;
  apiKey: string;
};
