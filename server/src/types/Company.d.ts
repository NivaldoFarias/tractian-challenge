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

export type QueryParameters = {
  limit?: number;
  sort_by?: "name" | "created_at" | "last_update";
  sort?: string;
};
