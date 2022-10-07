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
  ) {
    this.log = log;
    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
  }
}
