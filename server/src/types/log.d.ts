export interface Logs {
  [key: string]: string;
}

export type ChalkColors =
  | "green"
  | "magenta"
  | "blue"
  | "yellow"
  | "cyan"
  | "red";

export type LogTypes =
  | "Middleware"
  | "Controller"
  | "Repository"
  | "Server"
  | "Service"
  | "Util"
  | "Error";

export type AppLogType = {
  type: LogTypes;
  text: string;
};

export default class AppError {
  log: string;
  statusCode: number;
  message: string;
  detail: string | Record<string, unknown> | string[];

  constructor(
    log: string,
    statusCode: number,
    message: string,
    detail: string | Record<string, unknown> | string[],
  );
}
