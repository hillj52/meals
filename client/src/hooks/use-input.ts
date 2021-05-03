import React, { Reducer, useReducer } from 'react';

interface InputState {
  value: string;
  isTouched: boolean;
}

const initialState: InputState = {
  value: '',
  isTouched: false,
};

enum InputActionType {
  CHANGE_ACTION = 'change',
  BLUR_ACTION = 'blur',
  RESET_ACTION = 'reset',
}

interface ChangeAction {
  type: InputActionType.CHANGE_ACTION;
  value: string;
}

interface BlurAction {
  type: InputActionType.BLUR_ACTION;
}

interface ResetAction {
  type: InputActionType.RESET_ACTION;
}

type InputAction = ChangeAction | BlurAction | ResetAction;

const inputStateReducer: Reducer<InputState, InputAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case InputActionType.CHANGE_ACTION: {
      return {
        ...state,
        value: action.value,
      };
    }
    case InputActionType.BLUR_ACTION: {
      return {
        ...state,
        isTouched: true,
      };
    }
    case InputActionType.RESET_ACTION: {
      return {
        ...state,
        value: '',
        isTouched: false,
      };
    }
    default: {
      return state;
    }
  }
};

const useInput = (
  validate: (value: string) => boolean
): [
  string,
  boolean,
  boolean,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  (event?: React.FocusEvent<HTMLInputElement>) => void,
  () => void
] => {
  const [{ value, isTouched }, dispatch] = useReducer(
    inputStateReducer,
    initialState
  );

  const isValid = validate(value);
  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: InputActionType.CHANGE_ACTION,
      value: event.target.value,
    });
  };

  const inputBlurHandler = (event?: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: InputActionType.BLUR_ACTION });
  };

  const reset = () => {
    dispatch({ type: InputActionType.RESET_ACTION });
  };

  return [
    value,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  ];
};

export default useInput;
