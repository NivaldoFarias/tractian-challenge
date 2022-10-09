import { CreateUser } from '../types/User';
import { User } from '../mongo/models';
import AppLog from '../events/AppLog';

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
  return AppLog({ type: 'Repository', text: 'User instance inserted' });
}

export async function findByField({
  field,
  value,
}: {
  field: string;
  value: string;
}) {
  return await User.findOne({ [field]: value }).exec();
}
