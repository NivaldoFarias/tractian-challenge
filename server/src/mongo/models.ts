import * as schema from './schemas';
import mongoose from 'mongoose';

export const User = mongoose.model('User', schema.usersSchema);
export const Unit = mongoose.model('Unit', schema.unitsSchema);
export const Asset = mongoose.model('Asset', schema.assetsSchema);
export const Session = mongoose.model('Session', schema.sessionsSchema);
export const Company = mongoose.model('Company', schema.companiesSchema);
