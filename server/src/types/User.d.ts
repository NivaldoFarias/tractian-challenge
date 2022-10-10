import type { MongoDocument, UserType } from "./collection";
import { SessionType } from "./collection";

export type CreateUser = {
  full_name: string;
  username: string;
  password: string;
  company?: string;
};

export interface FindOne {
  company: string;
  apiKey: string;
}

export type SignInBody = {
  username: string;
  password: string;
};

export type UserDocument = MongoDocument<UserType>;
export type SessionDocument = MongoDocument<SessionType>;
