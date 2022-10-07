export interface Logs {
  [key: string]: string;
}

export type LogTypes =
  | 'Middleware'
  | 'Controller'
  | 'Repository'
  | 'Server'
  | 'Service'
  | 'Util'
  | 'Error';

export default class AppError {
  log: string;
  statusCode: number;
  message: string;
  detail: string | {} | string[];

  constructor(
    log: string,
    statusCode: number,
    message: string,
    detail: string | {} | string[],
  );
}
