import { MongooseError } from 'mongoose';

import type { APIModelsKeys } from '../types/collection';
import HandleValidationError from '../mongo/errors';
import AppLog from '../events/AppLog';
import { User, Asset, Unit, Company } from '../mongo/models';

async function validateSchema(model: APIModelsKeys, body: any) {
  let document = undefined;

  switch (model) {
    case 'User':
      document = new User(body);
      break;
    case 'Asset':
      document = new Asset(body);
      break;
    case 'Unit':
      document = new Unit(body);
      break;
    case 'Company':
      document = new Company(body);
      break;
    default:
      throw new Error('Invalid model');
  }

  try {
    await document.validate();
  } catch (error) {
    HandleValidationError(error as MongooseError);
  }

  return AppLog('Middleware', `Schema validated`);
}

export default validateSchema;
