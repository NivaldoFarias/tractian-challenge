import { Schema } from 'mongoose';

import type {
  UnitType,
  UserType,
  AssetType,
  CompanyType,
} from '../types/collection';
import { regex } from '../utils/constants.util';

export const usersSchema = new Schema<UserType>({
  name: { type: String, required: true, match: regex.USERNAME },
  password: { type: String, required: true, maxLength: 50 },
  createdAt: { type: Date, default: Date.now },
});

export const assetsSchema = new Schema<AssetType>({
  name: { type: String, required: true, maxLength: 50 },
  description: { type: String, required: true },
  model: { type: String, required: true, maxLength: 100 },
  owner: { type: String, required: true, maxLength: 50 },
  image: { type: String, required: true },
  status: {
    type: String,
    enum: ['RUNNING', 'ALERTING', 'STOPPED'],
    required: true,
  },
  health: { type: String, required: true, match: regex.HEALTH },
  createdAt: { type: Date, default: Date.now },
});

export const unitsSchema = new Schema<UnitType>({
  name: { type: String, required: true, maxLength: 50 },
  location: {
    type: {
      street: { type: String, required: true, maxLength: 100 },
      number: { type: String, required: true, maxLength: 10 },
      city: { type: String, required: true, maxLength: 50 },
      state: { type: String, required: true, maxLength: 50 },
      postalCode: { type: String, required: true, maxLength: 20 },
    },
    required: true,
  },
  assets: [assetsSchema],
  opensAt: { type: Date, required: true },
  closesAt: { type: Date, required: true },
  lastUpdate: { type: Date, default: Date.now },
});

export const companiesSchema = new Schema<CompanyType>({
  name: { type: String, required: true, maxLength: 100 },
  units: [unitsSchema],
  users: [usersSchema],
  'x-api-key': { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
