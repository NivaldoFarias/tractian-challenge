import bcrypt from "bcrypt";

import { env } from "../utils/constants.util";
import AppLog from "../events/AppLog";

export function hashPassword(password: string) {
  const encrypted = bcrypt.hashSync(password, env.SALT_ROUNDS);

  AppLog({ type: "Service", text: "Password encrypted" });
  return encrypted;
}
