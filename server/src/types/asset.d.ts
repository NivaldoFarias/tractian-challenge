import type { Document, Types } from "mongoose";
import type {
  AssetType,
  CompanyDocument,
  UnitDocument,
  UserDocument,
} from "./collections";

export type CreateRequestBody = {
  name: string;
  description?: string;
  model: string;
  image?: string;
  status: string;
  health: number;
  owner?: NonNullable<UserDocument>;
  unit_id: string;
};

export type Update = {
  asset_id: string;
  body: UpdateOne;
  unit: NonNullable<UnitDocument>;
  company: NonNullable<CompanyDocument>;
};

export type DeleteOne = {
  id: string;
  unit: NonNullable<UnitDocument>;
  company: NonNullable<CompanyDocument>;
};

export type UpdateOne = Partial<Omit<CreateRequestBody, "owner" | "unit_id">>;

export type PushAssetType = Document<unknown, unknown, AssetType> &
  AssetType & {
    _id: Types.ObjectId;
  };

export type FieldsToUpdate = Record<
  string,
  string | number | NonNullable<UserDocument>
>;
