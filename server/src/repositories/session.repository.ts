import { Session } from '../mongo/models';
import AppLog from '../events/AppLog';

export async function create({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  await new Session({
    username,
    token,
  }).save({
    validateBeforeSave: false,
  });
  return AppLog({ type: 'Repository', text: 'Session instance inserted' });
}

export async function deleteOne(token: string) {
  const result = await Session.deleteOne({ token });

  AppLog({ type: 'Repository', text: 'Session instance deleted' });
  return result;
}

export async function findByField({
  field,
  value,
}: {
  field: string;
  value: string;
}) {
  const result = await Session.findOne({ [field]: value }).exec();

  AppLog({ type: 'Repository', text: `Search User by ${field}` });
  return result;
}
