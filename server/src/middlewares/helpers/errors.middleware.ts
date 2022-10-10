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
    detail: "Ensure to provide the registered API key for the user's company",
  });
}

export function companyNameMismatch() {
  throw new AppError({
    statusCode: 400,
    message: "Company name mismatch",
    detail: "The provided company name does not match the company",
  });
}
