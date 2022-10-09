import { APIModelsKeys } from "./collection";

interface UseMiddleware {
  model?: APIModelsKeys;
  header?: string;
  token?: boolean;
  queries?: string[];
}

export default UseMiddleware;
