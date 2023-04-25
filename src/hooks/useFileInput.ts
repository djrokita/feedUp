import { ChangeEvent, useReducer } from 'react';

import { BlurAction, FileAction, FileActions, FileState, INPUT_ACTIONS, ValueAction } from "../types";

type Validator = (value: string) => boolean;

export function useFileInput(validaors: Validator[]) {
    const initState: FileState = {
        value: '',
        file: null,
        valid: false,
        touched: false,
    };

    function inputReducer<T extends FileActions>(state: FileState, action: T) {
        switch (action.type) {
            case INPUT_ACTIONS.VALUE:
                const valid = validaors.every(validator => validator(action.payload));
                return { ...state, value: action.payload, valid };
            case INPUT_ACTIONS.TOUCH:
                return { ...state, touched: true };
            case INPUT_ACTIONS.FILE:
                return { ...state, file: action.payload };
            default:
                throw new Error('Wrong action type');
        }
    }

    const [input, dispatchInput] = useReducer(inputReducer, initState);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const actionValue: ValueAction = { type: INPUT_ACTIONS.VALUE, payload: e.target.value };
            dispatchInput(actionValue);

            const actionFile: FileAction = { type: INPUT_ACTIONS.FILE, payload: e.target.files[0] };
            dispatchInput(actionFile);
        }
    };


    const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const action = { type: INPUT_ACTIONS.TOUCH, payload: true };
        dispatchInput(action as BlurAction);
    };


    return {
        input, changeHandler, blurHandler
    };

}