import type { UnitDocument, UserDocument, UserType } from "./collections";
import type { Document, Types } from "mongoose";

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

export type PushUserType = Document<unknown, unknown, UserType> &
  UserType & {
    _id: Types.ObjectId;
  };

export interface PushIntoArray {
  id: string;
  data: NonNullable<UserDocument> | NonNullable<UnitDocument>;
  array: "users" | "units";
}
