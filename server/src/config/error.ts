export default class AppError {
  properties: {
    log?: string;
    statusCode: number;
    message: string;
    detail: string | Record<string, unknown> | string[];
  };

  constructor(
    properties: {
      log?: string;
      statusCode: number;
      message: string;
      detail: string | Record<string, unknown> | string[];
    } = {
      statusCode: 500,
      message: "Internal server error",
      detail: {},
    },
  ) {
    this.properties = properties;
    this.properties.log = properties.log ?? properties.message;
  }
}
