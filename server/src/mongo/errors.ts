import { Error as ExtendedError } from "mongoose";
import AppError from "../config/error";

/* eslint-disable @typescript-eslint/ban-ts-comment */

export default function HandleValidationError(error: ExtendedError) {
  if (error instanceof ExtendedError.ValidationError) {
    const errors = error.errors;

    if (errors instanceof ExtendedError.CastError) {
      throw new AppError({
        statusCode: 422,
        message: `Invalid Request Input`,
        detail: `Value ${errors.value} is not a valid ${errors.path} type`,
      });
    }

    determineError(errors);
  } else if (error instanceof ExtendedError.CastError) {
    throw new AppError({
      statusCode: 422,
      message: `Invalid Request Input`,
      detail: `Value ${error.value} is not a valid ${error.path} type`,
    });
  }

  throw new AppError({
    statusCode: 500,
    message: "Internal server error",
    detail: "An unexpected error occurred while validating the model",
  });
}

function determineError(errors: {
  [x: string]: ExtendedError.ValidatorError | ExtendedError.CastError;
}) {
  const detail = [];
  let isSyntaxError = false;

  for (const variables of Object.values(errors)) {
    const { kind, path } = variables;
    let properties = undefined;

    if (variables instanceof ExtendedError.ValidatorError) {
      properties = variables.properties;
    }

    switch (kind) {
      case "required":
        if (!isSyntaxError) isSyntaxError = true;
        detail.push(`${path} is required`);
        break;
      case "unique":
        throw new AppError({
          statusCode: 409,
          message: `${path} already registered`,
          detail: `Ensure to provide a unique ${path}`,
        });
      case "minlength":
        if (isSyntaxError) break;

        if (properties) {
          detail.push(
            // @ts-ignore
            `Field '${path}' must be at least ${properties.minlength} characters in length`,
          );
          break;
        }

        detail.push(`Provided ${path} value is below minimum length`);

        break;
      case "maxlength":
        if (isSyntaxError) break;

        if (properties) {
          detail.push(
            // @ts-ignore
            `Field '${path}' cannot exceed ${properties.maxlength} characters in length`,
          );
          break;
        }

        detail.push(`Provided ${path} value is above minimum length`);
        break;
      case "enum":
        if (isSyntaxError) break;

        if (properties) {
          detail.push(
            // @ts-ignore
            `${path} must be one of \`${properties.enumValues.join("`, `")}\``,
          );
          break;
        }

        detail.push(`Provided ${path} value is not valid`);
        break;
      case "regexp":
        if (isSyntaxError) break;

        if (properties) {
          detail.push(
            // @ts-ignore
            `Field \`${path}\` must match the provided regex \`${properties.regexp}\``,
          );
          break;
        }

        detail.push(`Provided ${path} value is not valid`);
        break;
      case "min":
        if (isSyntaxError) break;

        if (properties) {
          // @ts-ignore
          detail.push(`${path} must be at least ${properties.min}`);
        }

        detail.push(`Provided ${path} value is below minimum`);
        break;
      case "max":
        if (isSyntaxError) break;

        if (properties) {
          // @ts-ignore
          detail.push(`${path} must be at most ${properties.max}`);
        }

        detail.push(`Provided ${path} value is above maximum`);
        break;
      default:
        detail.push(`${path} is invalid`);
    }
  }

  throw new AppError(
    isSyntaxError
      ? {
          statusCode: 400,
          message: "Invalid Syntax",
          detail,
        }
      : {
          statusCode: 422,
          message: "Invalid Request Input",
          detail,
        },
  );
}
