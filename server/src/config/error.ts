export default class AppError {
  properties: {
    log?: string;
    statusCode: number;
    message: string;
    detail: string | {} | string[];
  };

  constructor(
    properties: {
      log?: string;
      statusCode: number;
      message: string;
      detail: string | {} | string[];
    } = {
      statusCode: 500,
      message: 'Internal server error',
      detail: {},
    },
  ) {
    this.properties = properties;
    this.properties.log = properties.log ?? properties.message;
  }
}
