import { APIModels, APIModelsKeys } from './collection';

interface UseMiddleware {
  model?: APIModelsKeys;
  header?: string;
  token?: boolean;
}

export default UseMiddleware;
