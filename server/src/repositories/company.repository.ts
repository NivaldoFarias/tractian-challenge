import type { CreateData, FindByNameAndApiKey } from '../types/Company';

import { Company } from '../mongo/models';
import AppLog from '../events/AppLog';

export async function create(data: CreateData) {
  const { name, apiKey } = data;
  await new Company({ name, 'x-api-key': apiKey }).save({
    validateBeforeSave: false,
  });

  return AppLog({ type: 'Repository', text: 'Company instance inserted' });
}

export async function findByNameAndApiKey(data: FindByNameAndApiKey) {
  const { company, apiKey } = data;

  AppLog({ type: 'Repository', text: 'Search Company by API key' });
  return await Company.findOne({ company, api_key: apiKey }).exec();
}
