import AppError from "../../config/error";
import AppLog from "../../events/AppLog";

export function processHeader(header: string | undefined) {
  if (!header) {
    throw new AppError({
      statusCode: 400,
      message: "Missing headers",
      detail: `Ensure to provide the necessary headers`,
    });
  }

  return AppLog({ type: "Middleware", text: `Header processed` });
}
