import type { QueriesGeneric } from "../types/collections";

import { conditionals } from "../utils/constants.util";
import AppError from "../config/error";
import AppLog from "../events/AppLog";

export default function parseQueries(
  queries: QueriesGeneric,
  parameters: string[],
) {
  const output: QueriesGeneric = {};

  for (const [key, value] of Object.entries(queries)) {
    if (!parameters.includes(key)) continue;
    __validateParameter(key, value);
    output[key] = value;
  }

  AppLog({ type: "Middleware", text: "Queries parsed" });
  return output;
}

function __validateParameter(key: string, value: string | undefined) {
  switch (key) {
    case "limit":
      const [maxLimit, minLimit] = conditionals.COMPANY_QUERY_LIMIT;
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
      const allowedSorts = conditionals.COMPANY_QUERY_SORT;

      if (!allowedSorts.includes(value ?? "") || value === undefined) {
        throw new AppError({
          statusCode: 400,
          message: "Invalid query parameter",
          detail: `The parameter 'sort' must be string 'asc' or 'desc'`,
        });
      }
      break;
    case "sort_by":
      const allowedFields = conditionals.COMPANY_QUERY_SORT_BY;
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
