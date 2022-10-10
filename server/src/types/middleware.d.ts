import type {
  APIModelsKeys,
  MongoDocument,
  APIModelsTypes,
} from "./collections";

export interface UseMiddleware {
  model?: APIModelsKeys;
  header?: string;
  token?: boolean;
  queries?: string[];
  param?: APIModelsKeys;
}

export type MiddlewareGlobals = {
  token?: string;
  id?: string;
  model?: APIModelsKeys;
  param?: APIModelsKeys;
  body?: Record<string, unknown>;
};

export type MiddlewarePromises = [
  string?,
  MongoDocument<APIModelsTypes>?,
  unknown?,
];
