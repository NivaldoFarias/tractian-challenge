import { APIModelsKeys } from "./collection";

interface UseMiddleware {
  model?: APIModelsKeys;
  header?: string;
  token?: boolean;
  queries?: string[];
  param?: string;
}

export default UseMiddleware;
