import type { Document, Types } from "mongoose";
import { UserType } from "./collections";

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
