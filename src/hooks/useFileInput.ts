import { useReducer } from 'react';

import { initFileInputState, changeHandler, blurHandler, uploadHandler, fileHandler, FileState, INPUT_ACTIONS, Actions, previewHandler } from './helpers';

type Validator = (value: string) => boolean;

export function useFileInput(validaors: Validator[]) {
    function inputReducer<T extends Actions>(state: FileState, action: T): FileState {
        switch (action.type) {
            case INPUT_ACTIONS.VALUE:
                const valid = validaors.every(validator => validator(action.payload));
                return { ...state, value: action.payload, valid };
            case INPUT_ACTIONS.TOUCH:
                return { ...state, touched: true };
            case INPUT_ACTIONS.FILE:
                return { ...state, file: action.payload };
            case INPUT_ACTIONS.PREVIEW:
                return { ...state, imagePreview: action.payload };
            case INPUT_ACTIONS.RESET:
                return initFileInputState;
            default:
                throw new Error('Wrong action type');
        }
    }

    const [input, dispatchInput] = useReducer(inputReducer, initFileInputState);

    const resetHandler = () => dispatchInput({ type: INPUT_ACTIONS.RESET });
    return {
        input,
        changeHandler: changeHandler.bind(null, dispatchInput),
        blurHandler: blurHandler.bind(null, dispatchInput),
        fileHandler: fileHandler.bind(null, dispatchInput),
        uploadHandler: uploadHandler.bind(null, dispatchInput),
        previewHandler: previewHandler.bind(null, dispatchInput),
        resetHandler: resetHandler.bind(null, dispatchInput)
    };
}
