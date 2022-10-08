import { Schema } from 'mongoose';

import type {
  UnitType,
  UserType,
  AssetType,
  CompanyType,
} from '../types/collection';
import { regex } from '../utils/constants.util';

export const usersSchema = new Schema<UserType>({
  name: { type: String, required: true, unique: true, match: regex.USERNAME },
  full_name: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 50 },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const assetsSchema = new Schema<AssetType>({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: false },
  model: { type: String, required: true, maxLength: 100 },
  owner: { type: String, required: true, maxLength: 50 },
  image: { type: String, required: false },
  status: {
    type: String,
    enum: {
      values: ['RUNNING', 'ALERTING', 'STOPPED'],
      message: '{VALUE} is not supported',
    },
    required: true,
  },
  health: { type: Number, required: true, min: 0, max: 100 },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const unitsSchema = new Schema<UnitType>({
  name: { type: String, required: true, unique: true, maxLength: 50 },
  location: {
    type: {
      street: { type: String, required: true, maxLength: 100 },
      number: { type: String, required: true, maxLength: 10 },
      city: { type: String, required: true, maxLength: 50 },
      state: { type: String, required: true, maxLength: 50 },
      postal_code: { type: String, required: true, maxLength: 20 },
    },
    required: true,
  },
  assets: { type: [assetsSchema], required: false },
  opens_at: { type: String, required: true, match: regex.TIME },
  closes_at: { type: String, required: true, match: regex.TIME },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});

export const companiesSchema = new Schema<CompanyType>({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 100,
  },
  units: { type: [unitsSchema], required: false, default: [] },
  users: { type: [usersSchema], required: false, default: [] },
  'x-api-key': {
    type: String,
    required: false,
    unique: true,
    match: regex.API_KEY,
  },
  last_update: { type: Date, required: false, default: Date.now },
  created_at: { type: Date, required: false, default: Date.now },
});
