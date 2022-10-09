import "./../config/setup";

export const env = {
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_SUBJECT: process.env.JWT_SUBJECT || "user_id",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || "HS256",
};

export const regex = {
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
  USERNAME: /^(?=.{3,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z\d._]+(?<![_.])$/,
  TIME: /^(0\d|1\d|2[0-3]):[0-5]\d$/,
  HEALTH: /^(0\d{2}|100)$/,
  COMPANY_NAME: /^[a-zA-Z\d]{3,100}$/,
  API_KEY: /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/,
};

export const time = {
  CURRENT_MONTH: Number(new Date().getMonth().toString()) + 1,
  CURRENT_YEAR: Number(new Date().getFullYear().toString().slice(2)),
  CURRENT_DATE: Number(new Date().toISOString().slice(0, 19).replace("T", " ")),
  CURRENT_TIME: new Date().toISOString(),
};

export const conditionals = {
  COMPANY_QUERIES: ["limit", "sort", "sort_by"],
  COMPANY_QUERY_SORT: ["asc", "desc", "ascending", "descending", 1, -1],
  COMPANY_QUERY_SORT_BY: ["name", "created_at", "last_update"],
  COMPANY_QUERY_LIMIT: [100, 1],
  COMPANY_PARAM: "id",
};
