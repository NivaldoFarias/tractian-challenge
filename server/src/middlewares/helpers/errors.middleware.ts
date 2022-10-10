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
      "Ensure that the provided API key corresponds to an existing company",
  });
}
