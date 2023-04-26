import { useReducer } from 'react';

import { initInputState, changeHandler, blurHandler, resetHandler, Actions, INPUT_ACTIONS, State } from './helpers';

type Validator = (value: string) => boolean;

export function useInput(validaors: Validator[]) {
    function inputReducer<T extends Actions>(state: State, action: T) {
        switch (action.type) {
            case INPUT_ACTIONS.VALUE:
                const valid = validaors.every(validator => validator(action.payload));
                return { ...state, value: action.payload, valid };
            case INPUT_ACTIONS.TOUCH:
                return { ...state, touched: true };
            case INPUT_ACTIONS.RESET:
                return initInputState;
            default:
                throw new Error('Wrong action type');
        }
    }

    const [input, dispatchInput] = useReducer(inputReducer, initInputState);

    return {
        input,
        changeHandler: changeHandler.bind(null, dispatchInput),
        blurHandler: blurHandler.bind(null, dispatchInput),
        resetHandler: resetHandler.bind(null, dispatchInput)
    };
}