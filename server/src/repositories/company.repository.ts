import type { CreateData } from '../types/Company';
import { Company } from '../mongo/models';
import AppLog from '../events/AppLog';

export async function create(data: CreateData) {
  const { name, apiKey } = data;
  await new Company({ name, 'x-api-key': apiKey }).save({
    validateBeforeSave: false,
  });

  return AppLog({ type: 'Repository', text: 'Company instance inserted' });
}
