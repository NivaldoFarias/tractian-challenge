import './../config/setup';

export const env = {
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',
};

export const regex = {
  PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
  USERNAME: /^(?=.{3,25}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  TIME: /^(0\d|1\d|2[0-3]):[0-5]\d$/,
  HEALTH: /^(0\d{2}|100)$/,
};

export const time = {
  CURRENT_MONTH: Number(new Date().getMonth().toString()) + 1,
  CURRENT_YEAR: Number(new Date().getFullYear().toString().slice(2)),
  CURRRENT_DATE: Number(
    new Date().toISOString().slice(0, 19).replace('T', ' '),
  ),
};
