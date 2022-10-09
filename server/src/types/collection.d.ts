export type UserType = {
  username: string;
  full_name: string;
  password: string;
  last_update: Date;
  created_at: Date;
};

export type AssetType = {
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
  name: string;
  units: UnitType[];
  users: UserType[];
  "x-api-key": string;
  last_update: Date;
  created_at: Date;
};

export type CompanyFields = "name" | "units" | "users" | "x-api-key" | "last_update" | "created_at";

export type SessionType = {
  username: string;
  token: string;
  active: boolean;
};

export type APIModelsKeys = "User" | "Asset" | "Unit" | "Company" | "Session";

export interface QueriesGeneric {
  [key: string]: string | undefined;
}
