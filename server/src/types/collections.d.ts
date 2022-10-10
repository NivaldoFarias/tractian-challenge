import type { Document, Types } from "mongoose";

export type UserType = {
  _id?: Types.ObjectId;
  username: string;
  full_name: string;
  password: string;
  last_update: Date;
  created_at: Date;
};

export type AssetType = {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  model: string;
  owner: string;
  image: string;
  status: "RUNNING" | "ALERTING" | "STOPPED";
  health: number;
  last_update: Date;
  created_at: Date;
};

export type UnitType = {
  _id?: Types.ObjectId;
  name: string;
  location: {
    street: string;
    number: string;
    city: string;
    state: string;
    postal_code: string;
  };
  assets: AssetType[];
  opens_at: string;
  closes_at: string;
  last_update: Date;
  created_at: Date;
};

export type CompanyType = {
  _id?: Types.ObjectId;
  name: string;
  units: UnitType[];
  users: UserType[];
  "x-api-key": string;
  last_update: Date;
  created_at: Date;
};

export type SessionType = {
  _id?: Types.ObjectId;
  username: string;
  token: string;
  active: boolean;
};

export type CompanyFields =
  | "name"
  | "units"
  | "users"
  | "x-api-key"
  | "last_update"
  | "created_at";

export type APIModelsKeys = "User" | "Asset" | "Unit" | "Company" | "Session";

export type APIModelsTypes =
  | UserType
  | AssetType
  | UnitType
  | CompanyType
  | SessionType;

export type UserDocument = MongoDocument<UserType>;
export type UnitDocument = MongoDocument<UnitType>;
export type AssetDocument = MongoDocument<AssetType>;
export type CompanyDocument = MongoDocument<CompanyType>;
export type SessionDocument = MongoDocument<SessionType>;

export type NonNullUserDocument = NonNullMongoDocument<UserType>;
export type NonNullUnitDocument = NonNullMongoDocument<UnitType>;
export type NonNullAssetDocument = NonNullMongoDocument<AssetType>;
export type NonNullCompanyDocument = NonNullMongoDocument<CompanyType>;
export type NonNullSessionDocument = NonNullMongoDocument<SessionType>;

export interface QueriesGeneric {
  [key: string]: unknown;
}

export interface QueryParameters {
  limit?: number;
  sort_by?: "name" | "created_at" | "last_update";
  sort?: string;
}

export type NonNullMongoDocument<T> =
  | Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      };

export type MongoDocument<T> =
  | (Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;
