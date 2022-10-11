import AppError from "../../config/error";
import { APIModelsKeys } from "../../types/collections";

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

export function invalidIdSyntax() {
  throw new AppError({
    statusCode: 400,
    message: "Invalid Syntax",
    detail: "Ensure to provide the a valid ObjectId",
  });
}

export function companyNameMismatch() {
  throw new AppError({
    statusCode: 400,
    message: "Company name mismatch",
    detail: "The provided company name does not match the company",
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

export function unitDoesNotBelongToCompany() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "Ensure that the provided unit belongs to the company",
  });
}

export function updateWithNoChanges() {
  throw new AppError({
    statusCode: 400,
    message: "No changes detected",
    detail: "Ensure to provide a different name",
  });
}

export function assetDoesNotBelongToUnit() {
  throw new AppError({
    statusCode: 403,
    message: "Forbidden",
    detail: "Ensure that the provided asset belongs to the unit",
  });
}

export function notFound(model: APIModelsKeys) {
  throw new AppError({
    statusCode: 404,
    message: `${model} Not Found`,
    detail: `The provided ObjectId does not match any existing ${model}`,
  });
}

export function unitNotFound() {
  return notFound("Unit");
}

export function userNotFound() {
  return notFound("User");
}

export function assetNotFound() {
  return notFound("Asset");
}

export function companyNotFound() {
  return notFound("Company");
}

export function companyNotFoundById() {
  return notFound("Company");
}
