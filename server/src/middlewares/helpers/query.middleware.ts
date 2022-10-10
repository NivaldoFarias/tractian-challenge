import type { QueriesGeneric, APIModelsKeys } from "../../types/collections";

import { query } from "../../utils/constants.util";
import AppError from "../../config/error";
import AppLog from "../../events/AppLog";

interface ValidateParameters {
  key: string;
  value: string | undefined;
  model: APIModelsKeys;
}

export function parseQueries(queries: QueriesGeneric, model: APIModelsKeys) {
  const output: QueriesGeneric = {};

  for (const [key, value] of Object.entries(queries)) {
    const KEYS = query.KEYS as string[];
    const invalidKeyValues = typeof value !== "string" || !KEYS.includes(key);
    if (invalidKeyValues) continue;

    __validateParameter({ key, value, model });
    output[key] = value;
  }

  AppLog({ type: "Middleware", text: "Queries parsed" });
  return output;
}

function __validateParameter({ key, value, model }: ValidateParameters) {
  switch (key) {
    case "limit":
      const [maxLimit, minLimit] = query.LIMIT;
      const limit = Number(value);

      if (isNaN(limit) || limit > maxLimit || limit < minLimit) {
        throw new AppError({
          statusCode: 400,
          message: "Invalid query parameter",
          detail: `The parameter 'limit' must be a number between ${minLimit} and ${maxLimit}`,
        });
      }
      break;
    case "sort":
      const allowedSorts = query.SORT as string[];

      if (!allowedSorts.includes(value ?? "")) {
        throw new AppError({
          statusCode: 400,
          message: "Invalid query parameter",
          detail: `The parameter 'sort' must be one of: ${allowedSorts.join(
            ", ",
          )}`,
        });
      }
      break;
    case "sort_by":
      const MODEL = model.toUpperCase();
      const allowedFields = query[MODEL] as string[];
      const normalizedField = value?.toLowerCase() ?? "";

      if (!allowedFields.includes(normalizedField)) {
        throw new AppError({
          statusCode: 400,
          message: "Invalid query parameter",
          detail: `The parameter 'sort_by' must be one of: ${allowedFields.join(
            ", ",
          )}`,
        });
      }
      break;
    default:
      throw new AppError({
        statusCode: 400,
        message: "Invalid query parameter",
        detail: `The parameter '${key}' is not allowed`,
      });
  }
}
