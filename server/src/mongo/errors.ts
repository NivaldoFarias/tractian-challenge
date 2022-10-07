import { MongooseError, Error as ExtendedError } from 'mongoose';

export default function HandleExtendedError(error: MongooseError) {
  if (error instanceof ExtendedError.ValidationError) {
    const errors = error.errors;

    if (errors instanceof ExtendedError.CastError) {
      return invalidRequestInput(errors);
    }

    return determineError(errors);
  } else if (error instanceof ExtendedError.CastError) {
    return invalidRequestInput(error);
  }

  return defaultResponse(error);
}

function defaultResponse(error: MongooseError) {
  return {
    statusCode: 500,
    message: 'Internal server error',
    detail: error,
  };
}

function invalidRequestInput(error: ExtendedError.CastError) {
  return {
    statusCode: 422,
    message: `Invalid Request Input`,
    detail: `Value ${error.value} is not a valid ${error.path} type`,
  };
}

function determineError(errors: {
  [x: string]: ExtendedError.ValidatorError | ExtendedError.CastError;
}) {
  const detail = [];
  let isSyntaxError = false;

  for (const variables of Object.values(errors)) {
    const { kind, path, value } = variables;
    let properties = undefined;

    if (variables instanceof ExtendedError.ValidatorError) {
      properties = variables.properties;
    }

    switch (kind) {
      case 'required':
        if (!isSyntaxError) isSyntaxError = true;
        detail.push(`${path} is required`);
        break;
      case 'unique':
        return {
          statusCode: 409,
          message: `${path} already registered`,
          detail: `Ensure to provide a unique ${path}`,
        };
      case 'minlength':
        if (isSyntaxError) break;

        if (properties) {
          detail.push(
            `${path} must be at least ${properties.reason} characters`,
          );
          break;
        }

        detail.push(`Provided ${path} value is below minimum length`);

        break;
      case 'maxlength':
        if (isSyntaxError) break;

        if (properties) {
          detail.push(
            `${path} must be at most ${properties.reason} characters`,
          );
          break;
        }

        detail.push(`Provided ${path} value is above minimum length`);
        break;
      case 'enum':
        if (isSyntaxError) break;

        if (properties) {
          detail.push(`${path} must be one of ${properties.reason}`);
          break;
        }

        detail.push(`Provided ${path} value is not valid`);
        break;
      case 'match':
        if (isSyntaxError) break;

        if (properties) {
          detail.push(`${path} must match ${properties.reason}`);
          break;
        }

        detail.push(`Provided ${path} value is not valid`);
        break;
      case 'min':
        if (isSyntaxError) break;

        if (properties) {
          detail.push(`${path} must be at least ${properties.reason}`);
        }

        detail.push(`Provided ${path} value is below minimum`);
        break;
      case 'max':
        if (isSyntaxError) break;

        if (properties) {
          detail.push(`${path} must be at most ${properties.reason}`);
        }

        detail.push(`Provided ${path} value is above maximum`);
        break;
      default:
        detail.push(`${path} is invalid`);
    }
  }

  return isSyntaxError
    ? {
        statusCode: 400,
        message: 'Invalid Syntax',
        detail,
      }
    : {
        statusCode: 422,
        message: 'Invalid Request Input',
        detail,
      };
}
