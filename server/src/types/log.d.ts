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
