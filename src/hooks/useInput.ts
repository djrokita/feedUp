import { ChangeEvent, useReducer } from 'react';

import { Actions, BlurAction, INPUT_ACTIONS, State, ValueAction } from "../types";

type Validator = (value: string) => boolean;
type InputElement = HTMLInputElement | HTMLTextAreaElement;

export function useInput(validaors: Validator[]) {
    const initState: State = {
        value: '',
        valid: false,
        touched: false,
    };

    function inputReducer<T extends Actions>(state: State, action: T) {
        switch (action.type) {
            case INPUT_ACTIONS.VALUE:
                const valid = validaors.every(validator => validator(action.payload));
                return { ...state, value: action.payload, valid };
            case INPUT_ACTIONS.TOUCH:
                return { ...state, touched: true };
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
        const action = { type: INPUT_ACTIONS.TOUCH, payload: true };
        dispatchInput(action as BlurAction);
    };


    return {
        input, changeHandler, blurHandler
    };

}