import type { Document, Types } from 'mongoose';
import type { UserType } from './collection';
import { SessionType } from './collection';

export type CreateUser = {
  full_name: string;
  username: string;
  password: string;
  company: string;
};

export interface FindOne {
  company: string;
  apiKey: string;
}

export type SignInBody = {
  username: string;
  password: string;
};

export type FindUserResponse =
  | (Document<unknown, any, UserType> &
      UserType & {
        _id: Types.ObjectId;
      })
  | null;

export type FindSessionResponse =
  | (Document<unknown, any, SessionType> &
      SessionType & {
        _id: Types.ObjectId;
      })
  | null;
