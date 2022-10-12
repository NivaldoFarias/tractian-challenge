export interface ReducerState {
  username: {
    value: string;
    autofilled: boolean;
    valid: boolean;
  };
  password: {
    value: string;
    autofilled: boolean;
  };
  submitted: boolean;
  loading: boolean;
  error: string | null;
}

declare enum Keys {
  username = "username",
  password = "password",
}

declare enum Fields {
  value = "value",
  autofilled = "autofilled",
  valid = "valid",
}

export interface ChangeAction {
  type: "change";
  key: Keys;
  field: Fields;
  payload: string | boolean;
}

export interface BooleanAction {
  type: "boolean";
  key: "isLoading" | "hasSubmitted";
  payload: boolean;
}

export interface ErrorAction {
  type: "error";
  payload: string;
}

export interface ResetAction {
  type: "reset";
  key: Keys;
}

export type FormReducerAction = BooleanAction | ChangeAction | ErrorAction | ResetAction;
