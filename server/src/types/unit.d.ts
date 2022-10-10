import type { Document, Types } from "mongoose";
import type { AssetType } from "./collections";

export type CreateRequestBody = {
  name: string;
  street?: string;
  number?: string;
  city: string;
  state: string;
  postal_code?: string;
  assets?: AssetType[];
  opens_at: string;
  closes_at: string;
  company?: string;
};

export type CreateData = {
  name: string;
  apiKey: string;
};

export type Update = {
  id: string;
  body: UpdateOne;
};

export type UpdateOne = Partial<CreateRequestBody>;

export type PushAssetType = Document<unknown, unknown, AssetType> &
  AssetType & {
    _id: Types.ObjectId;
  };

export type FieldsToUpdate = Record<string, string | AssetType[]>;
