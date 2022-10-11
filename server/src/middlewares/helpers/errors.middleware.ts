import AppError from "../../config/error";

export function Forbidden() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "The provided API key does not match the company",
  });
}

export function ForbiddenToken() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "User does not have permission to modify this resource",
  });
}

export function companyNameMismatch() {
  throw new AppError({
    statusCode: 400,
    message: "Company name mismatch",
    detail: "The provided company name does not match the company",
  });
}

export function companyNotFound() {
  throw new AppError({
    statusCode: 404,
    message: "Company Not Found",
    detail:
      "Ensure that the provided company name corresponds to an existing company",
  });
}

export function companyNotFoundByApiKey() {
  throw new AppError({
    statusCode: 404,
    message: "Company Not Found",
    detail:
      "Ensure that the provided API key corresponds to an existing company",
  });
}

export function companyNotFoundById() {
  throw new AppError({
    statusCode: 404,
    message: "Company not found",
    detail: "Ensure to provide a valid company id",
  });
}

export function unitDoesNotBelongToCompany() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "Ensure that the provided unit belongs to the company",
  });
}

export function unitNotFound() {
  throw new AppError({
    statusCode: 404,
    message: "Unit not found",
    detail: "Ensure to provide a valid unit Id",
  });
}

export function updateWithNoChanges() {
  throw new AppError({
    statusCode: 400,
    message: "No changes detected",
    detail: "Ensure to provide a different name",
  });
}

export function userNotFound() {
  throw new AppError({
    statusCode: 404,
    message: "User not found",
    detail: "Ensure to provide a valid user Id",
  });
}

export function assetNotFound() {
  throw new AppError({
    statusCode: 404,
    message: "Asset not found",
    detail: "Ensure to provide a valid asset Id",
  });
}

export function assetDoesNotBelongToUnit() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "Ensure that the provided asset belongs to the unit",
  });
}
