import type { AppLogType, ChalkColors, Logs } from "../types/log";
import chalk from "chalk";

const typesHash: Logs = {
  Middleware: "magenta",
  Controller: "green",
  Repository: "blue",
  Server: "yellow",
  Service: "cyan",
  Util: "cyan",
  Error: "red",
};

export default function AppLog({ type, text }: AppLogType) {
  /* eslint-disable no-console */
  return console.log(
    chalk.bold[typesHash[type] as ChalkColors](
      `[${type.toUpperCase()}] ${text}`,
    ),
  );
}
