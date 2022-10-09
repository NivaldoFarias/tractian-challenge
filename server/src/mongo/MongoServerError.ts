export default class MongoServerError extends Error {
  name: string;

  constructor(
    message: string,
    public code: number,
    public index: number,
    public keyPattern: Record<string, string>,
    public keyValue: Record<string, unknown>,
  ) {
    super(message);
    this.name = "MongoServerError";
    this.code = code;
    this.index = index;
    this.keyPattern = keyPattern;
    this.keyValue = keyValue;
  }
}
