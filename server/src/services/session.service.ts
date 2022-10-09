import type { Algorithm, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { env } from "../utils/constants.util";
import AppLog from "../events/AppLog";

export function decryptPassword(password: string, encrypted: string) {
  const isValid = bcrypt.compareSync(password, encrypted);

  AppLog({ type: "Service", text: "Password decrypted" });
  return isValid;
}

export function generateToken(id: number) {
  const data = { user_id: id.toString() };
  const subject = "user_id";
  const secretKey = env.JWT_SECRET;
  const expiresIn = env.JWT_EXPIRES_IN;

  const algorithm = env.JWT_ALGORITHM as Algorithm;
  const config: SignOptions = { algorithm, expiresIn, subject };

  const token = jwt.sign(data, secretKey, config);

  AppLog({ type: "Service", text: "Token generated" });
  return token;
}
