import type { Document, Types } from "mongoose";
import { CompanyType, MongoDocument, UserType } from "./collection";

export type CreateRequestBody = {
  name: string;
};

export type CreateData = {
  name: string;
  apiKey: string;
};

export type Update = {
  id: string;
  name: string;
};

export type QueryParameters = {
  limit?: number;
  sort_by?: "name" | "created_at" | "last_update";
  sort?: string;
};

export type PushUserType = Document<unknown, unknown, UserType> &
  UserType & {
    _id: Types.ObjectId;
  };

export type CompanyDocument = MongoDocument<CompanyType>;
