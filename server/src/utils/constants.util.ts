import "./../config/setup";

type Query = Record<string, string[] | number[] | (string | number)[]>;

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
  URL: new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ),
  IMAGE_EXTENSION: /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i,
  IMAGE_URL:
    /((?:(https?:\/\/www)|(https?:\/\/)|(www))[-a-zA-Z\d@:%_\+.~#?&\/\/=]+)\.(jpe?g|gif|png|bmp|tiff?|tga|svg)/g,
};

export const time = {
  CURRENT_MONTH: Number(new Date().getMonth().toString()) + 1,
  CURRENT_YEAR: Number(new Date().getFullYear().toString().slice(2)),
  CURRENT_DATE: Number(new Date().toISOString().slice(0, 19).replace("T", " ")),
  CURRENT_TIME: new Date().toISOString(),
};

export const query: Query = {
  LIMIT: [100, 1],
  KEYS: ["limit", "sort", "sort_by"],
  SORT: ["asc", "desc", "ascending", "descending", "1", "-1"],
  USER: ["username", "created_at", "last_update"],
  COMPANY: ["name", "created_at", "last_update"],
  ASSET: ["name", "created_at", "last_update"],
  UNIT: ["name", "created_at", "last_update"],
};
