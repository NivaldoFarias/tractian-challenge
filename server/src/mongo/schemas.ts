import { Schema } from "mongoose";
import urlExists from "./../utils/url.util";

import type {
  UnitType,
  UserType,
  AssetType,
  SessionType,
  CompanyType,
} from "../types/collections";
import { regex } from "../utils/constants.util";

const __userSubDoc = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    unique: false,
    match: regex.USERNAME,
  },
  full_name: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const usersSchema = new Schema<UserType>({
  username: {
    type: String,
    required: true,
    unique: true,
    match: regex.USERNAME,
  },
  full_name: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const assetsSchema = new Schema<AssetType>({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: false },
  model: { type: String, required: true, maxLength: 100 },
  owner: { type: __userSubDoc, required: false, unique: false },
  image: {
    type: String,
    required: false,
    validate: {
      validator: async (value: string) => {
        if (!regex.IMAGE_URL.test(value)) return false;
        return await urlExists(value);
      },
      message: (props) => `${props} is not a valid URL`,
    },
  },
  status: {
    type: String,
    enum: {
      values: ["RUNNING", "ALERTING", "STOPPED"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  health: { type: Number, required: true, min: 0, max: 100 },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

const __unitSubDoc = new Schema<UnitType>({
  name: { type: String, required: true, unique: false, maxLength: 50 },
  street: { type: String, required: false, maxLength: 100 },
  number: { type: String, required: false, maxLength: 10 },
  city: { type: String, required: true, maxLength: 50 },
  state: { type: String, required: true, maxLength: 50 },
  postal_code: { type: String, required: false, maxLength: 20 },
  assets: { type: [assetsSchema], required: false },
  opens_at: { type: String, required: true, match: regex.TIME },
  closes_at: { type: String, required: true, match: regex.TIME },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const unitsSchema = new Schema<UnitType>({
  name: { type: String, required: true, unique: true, maxLength: 50 },
  street: { type: String, required: false, maxLength: 100 },
  number: { type: String, required: false, maxLength: 10 },
  city: { type: String, required: true, maxLength: 50 },
  state: { type: String, required: true, maxLength: 50 },
  postal_code: { type: String, required: false, maxLength: 20 },
  assets: { type: [assetsSchema], required: false },
  opens_at: { type: String, required: true, match: regex.TIME },
  closes_at: { type: String, required: true, match: regex.TIME },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const sessionsSchema = new Schema<SessionType>({
  username: { type: String, required: true, index: true, unique: true },
  token: { type: String, required: false, unique: true, default: null },
  active: { type: Boolean, required: true, default: true },
});

export const companiesSchema = new Schema<CompanyType>({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
  },
  units: { type: [__unitSubDoc], required: false, default: [] },
  users: { type: [__userSubDoc], required: false, default: [] },
  "x-api-key": {
    type: String,
    required: false,
    unique: true,
    immutable: true,
    match: regex.API_KEY,
  },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});
