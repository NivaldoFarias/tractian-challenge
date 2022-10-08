import { Model, Schema } from 'mongoose';

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
  status: 'RUNNING' | 'ALERTING' | 'STOPPED';
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
  'x-api-key': string;
  last_update: Date;
  created_at: Date;
};

export type APIModelsKeys = 'User' | 'Asset' | 'Unit' | 'Company';

export type APIModels =
  | Model<
      CompanyType,
      {},
      {},
      {},
      Schema<
        CompanyType,
        Model<CompanyType, any, any, any, any>,
        {},
        {},
        {},
        {},
        'type',
        CompanyType
      >
    >
  | Model<
      UnitType,
      {},
      {},
      {},
      Schema<
        UnitType,
        Model<UnitType, any, any, any, any>,
        {},
        {},
        {},
        {},
        'type',
        UnitType
      >
    >
  | Model<
      UserType,
      {},
      {},
      {},
      Schema<
        UserType,
        Model<UserType, any, any, any, any>,
        {},
        {},
        {},
        {},
        'type',
        UserType
      >
    >
  | Model<
      AssetType,
      {},
      {},
      {},
      Schema<
        AssetType,
        Model<AssetType, any, any, any, any>,
        {},
        {},
        {},
        {},
        'type',
        AssetType
      >
    >;
