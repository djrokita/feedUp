import { ChangeEvent, useReducer } from 'react';

import { Actions, BlurAction, INPUT_ACTIONS, State, ValueAction } from "../types";

type Validator = (value: string) => boolean;
type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const initState: State = {
    value: '',
    valid: false,
    touched: false,
};

export function useInput(validaors: Validator[]) {
    function inputReducer<T extends Actions>(state: State, action: T) {
        switch (action.type) {
            case INPUT_ACTIONS.VALUE:
                const valid = validaors.every(validator => validator(action.payload));
                return { ...state, value: action.payload, valid };
            case INPUT_ACTIONS.TOUCH:
                return { ...state, touched: true };
            case INPUT_ACTIONS.RESET:
                return initState;
            default:
                throw new Error('Wrong action type');
        }
    }

    const [input, dispatchInput] = useReducer(inputReducer, initState);

    const changeHandler = (e: ChangeEvent<InputElement>) => {
        const action = { type: INPUT_ACTIONS.VALUE, payload: e.target.value };
        dispatchInput(action as ValueAction);
    };


    const blurHandler = (e: ChangeEvent<InputElement>) => {
        const action = { type: INPUT_ACTIONS.TOUCH };
        dispatchInput(action as BlurAction);
    };

    const resetHandler = () => dispatchInput({ type: INPUT_ACTIONS.RESET });

    return {
        input, changeHandler, blurHandler, resetHandler
    };

}