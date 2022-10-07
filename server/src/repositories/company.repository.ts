import type { CreateData } from '../types/Company';
import { Company } from '../mongo/model';
import AppLog from '../events/AppLog';

export async function create(data: CreateData) {
  const { name, apiKey } = data;
  await new Company({ name, api_key: apiKey }).save();

  return AppLog('Repository', 'Company instance inserted');
}
