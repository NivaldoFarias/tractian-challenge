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
  await Session.deleteOne({ token });
  return AppLog({ type: 'Repository', text: 'Session instance deleted' });
}
