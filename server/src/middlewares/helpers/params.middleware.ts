import type { APIModelsKeys } from "../../types/collections";

import * as queries from "./../../utils/queries.util";
import AppError from "../../config/error";
import AppLog from "../../events/AppLog";

export async function validateParameters(id: string, model: APIModelsKeys) {
  const notObjectId = typeof id !== "string" || id.length !== 24;
  if (notObjectId) {
    throw new AppError({
      statusCode: 400,
      message: "Invalid Syntax",
      detail: "Ensure to provide the a valid ObjectId",
    });
  }

  const result = await queries.findById({ id, model });
  if (!result) {
    throw new AppError({
      statusCode: 404,
      message: `${model} Not Found`,
      detail: `The provided ObjectId does not mtach any existing ${model}`,
    });
  }

  AppLog({ type: "Middleware", text: `Valid ${model} ObjectId` });
  return result;
}
