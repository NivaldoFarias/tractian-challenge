import type { APIModelsKeys } from "../../types/collections";

import * as queries from "./../../utils/queries.util";
import * as errors from "./errors.middleware";
import AppLog from "../../events/AppLog";

export async function validateParameters(id: string, model: APIModelsKeys) {
  const notObjectId = typeof id !== "string" || id.length !== 24;
  if (notObjectId) errors.invalidIdSyntax();

  const result = await queries.findById({ id, model });
  if (!result) errors.notFound(model);

  AppLog({ type: "Middleware", text: `Valid ${model} ObjectId` });
  return result;
}
