import React, { ChangeEvent, Dispatch } from 'react';

export enum INPUT_ACTIONS {
    VALUE = "value",
    TOUCH = "touch",
    FILE = "file",
    RESET = "reset"
}

export type ValueAction = {
    type: INPUT_ACTIONS.VALUE;
    payload: string;
};

export type BlurAction = {
    type: INPUT_ACTIONS.TOUCH;
};

export type ResetAction = {
    type: INPUT_ACTIONS.RESET;
};

export type FileAction = {
    type: INPUT_ACTIONS.FILE;
    payload: File;
};

export type Actions = ValueAction | BlurAction | ResetAction;
export type FileActions = Actions | FileAction;

export type Validator = (value: string) => boolean;
export type State = {
    value: string;
    valid: boolean;
    touched: boolean;
};

export type FileState = State & {
    file: File | null;
};

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const initInputState: State = {
    value: '',
    valid: false,
    touched: false,
};

export const initFileInputState: FileState = {
    ...initInputState, file: null,
};


export const changeHandler = <T extends InputElement>(dispatch: Dispatch<ValueAction>, e: ChangeEvent<T>) => {
    const actionValue: ValueAction = { type: INPUT_ACTIONS.VALUE, payload: e.target.value };
    dispatch(actionValue);
};

export const fileHandler = (dispatch: Dispatch<FileAction>, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const actionFile: FileAction = { type: INPUT_ACTIONS.FILE, payload: e.target.files[0] };
        dispatch(actionFile);
    }
};

export const blurHandler = (dispatch: Dispatch<BlurAction>) => {
    const action: BlurAction = { type: INPUT_ACTIONS.TOUCH };
    dispatch(action);
};

export const resetHandler = (dispatch: Dispatch<ResetAction>) => dispatch({ type: INPUT_ACTIONS.RESET });

