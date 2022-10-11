import type {
  APIModelsKeys,
  MongoDocument,
  APIModelsTypes,
  CompanyDocument,
} from "./collections";

export interface UseMiddleware {
  model?: APIModelsKeys;
  header?: string;
  token?: boolean;
  query?: APIModelsKeys;
  param?: APIModelsKeys;
  search?: "unit_id" | "company_id";
}

export type MiddlewareGlobals = {
  token?: string;
  id?: string;
  model?: APIModelsKeys;
  param?: APIModelsKeys;
  header?: string;
  body?: Record<string, unknown>;
};

export type MiddlewarePromises = [
  string?,
  MongoDocument<APIModelsTypes>?,
  CompanyDocument?,
  unknown?,
];
