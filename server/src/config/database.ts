import mongoose from 'mongoose';

import AppLog from './../events/AppLog';
import './setup';

const connectionString = process.env?.DATABASE_URL ?? '';
const options = {};

export default async function connectToDatabase() {
  try {
    await mongoose.connect(connectionString, options);
  } catch (error) {
    AppLog('Error', `Interal error whilte connecting to database | ${error}`);
  }
  AppLog('Server', 'Connected to database');
}
