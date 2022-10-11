import type { Document, Types } from "mongoose";
import type { AssetType } from "./collections";

export type CreateRequestBody = {
  name: string;
  description?: string;
  model: string;
  owner: string;
  image?: string;
  status: string;
  health: number;
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
