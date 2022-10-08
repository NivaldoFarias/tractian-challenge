import { FindOne, CreateUser } from '../types/User';
import { Company, User } from '../mongo/models';
import AppLog from '../events/AppLog';

export async function findOne(data: FindOne) {
  const { company, apiKey } = data;

  AppLog('Repository', 'Query Company by API key');
  return await Company.findOne({ company, api_key: apiKey }).exec();
}

export async function create(data: CreateUser) {
  const { full_name, username, password, company } = data;

  await new User({
    full_name,
    username,
    password,
    company,
  }).save({
    validateBeforeSave: false,
  });
  return AppLog('Repository', 'User instance inserted');
}
