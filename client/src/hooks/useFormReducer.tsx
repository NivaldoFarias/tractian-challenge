import type { FormReducerAction, ReducerState } from "../types/hooks";
import type { Dispatch } from "react";

import { useReducer } from "react";

export const initialState: ReducerState = {
  username: {
    value: "",
    autofilled: false,
    valid: true,
  },
  password: {
    value: "",
    autofilled: false,
  },
  submitted: false,
  loading: false,
  error: null,
};

export function formReducer(state: ReducerState, action: FormReducerAction) {
  switch (action.type) {
    case "change": {
      const { key, field, payload } = action;

      return {
        ...state,
        [key]: {
          ...state[key],
          [field]: payload,
        },
      };
    }
    case "boolean": {
      const { key, payload } = action;
      return {
        ...state,
        [key]: payload,
      };
    }
    case "error": {
      const { payload } = action;
      return {
        ...state,
        error: payload,
      };
    }
    case "reset": {
      const { key } = action;
      return {
        ...state,
        [key]: initialState[key],
      };
    }
    default:
      throw new Error(`Unhandled action type`);
  }
}

export default function useFormReducer() {
  const [state, dispatch]: [state: ReducerState, dispatch: Dispatch<FormReducerAction>] =
    useReducer(formReducer, initialState);
  return { state, dispatch };
}
