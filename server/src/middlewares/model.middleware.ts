import type { APIModelsKeys } from "../types/collection";
import type { MongooseError } from "mongoose";

import { User, Asset, Unit, Company, Session } from "../mongo/models";
import HandleValidationError from "../mongo/errors";
import AppLog from "../events/AppLog";

export default async function validateModel(model: APIModelsKeys, body: Record<string, unknown>) {
  let document = undefined;

  switch (model) {
    case "User":
      document = new User(body);
      break;
    case "Asset":
      document = new Asset(body);
      break;
    case "Unit":
      document = new Unit(body);
      break;
    case "Company":
      document = new Company(body);
      break;
    case "Session":
      document = new Session(body);
      break;
    default:
      throw new Error("Invalid model");
  }

  try {
    await document.validate();
  } catch (error) {
    HandleValidationError(error as MongooseError);
  }

  return AppLog({ type: "Middleware", text: `Model validated` });
}
