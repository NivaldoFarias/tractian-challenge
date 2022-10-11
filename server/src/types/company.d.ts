import type { UserType } from "./collections";
import type { Document, Types } from "mongoose";
import { CreateUser } from "./user";

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
  data: CreateRequestBody | CreateUser;
  array: "users" | "units";
}
