import { ChangeEvent, Dispatch } from 'react';

import { generateBase64FromImage } from '../utils/image';

export enum INPUT_ACTIONS {
    VALUE = "value",
    TOUCH = "touch",
    FILE = "file",
    PREVIEW = "preview",
    UPLOAD = "upload",
    RESET = "reset"
}

type BaseAction = {
    type: INPUT_ACTIONS;
};

export type ValueAction = BaseAction & {
    type: INPUT_ACTIONS.VALUE;
    payload: string;
};

export type BlurAction = BaseAction & {
    type: INPUT_ACTIONS.TOUCH;
};

export type ResetAction = BaseAction & {
    type: INPUT_ACTIONS.RESET;
};

// export type UplaodAction = BaseAction & {
//     type: INPUT_ACTIONS.UPLOAD;
//     payload: string;
// };

export type FileAction = BaseAction & {
    type: INPUT_ACTIONS.FILE;
    payload: File;
};

export type PreviewAction = BaseAction & {
    type: INPUT_ACTIONS.PREVIEW;
    payload: string | null;
};

export type BaseInputActions = ValueAction | BlurAction | ResetAction;
export type FileActions = FileAction | PreviewAction;

export type Actions = BaseInputActions | FileActions;

export type Validator = (value: string) => boolean;
export type State = {
    value: string;
    valid: boolean;
    touched: boolean;
};

export type FileState = State & {
    file: File | null;
    imagePreview: string | null;
};

export type InputElement = HTMLInputElement | HTMLTextAreaElement;

export const initInputState: State = {
    value: '',
    valid: false,
    touched: false,
};

export const initFileInputState: FileState = {
    ...initInputState, file: null, imagePreview: null
};

const getImagePreview = async (image: File) => {
    return await generateBase64FromImage(image);
};

export const changeHandler = <T extends InputElement>(dispatch: Dispatch<ValueAction>, e: ChangeEvent<T>) => {
    const action: ValueAction = { type: INPUT_ACTIONS.VALUE, payload: e.target.value };
    dispatch(action);
};

export const fileHandler = (dispatch: Dispatch<FileAction>, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const action: FileAction = { type: INPUT_ACTIONS.FILE, payload: e.target.files[0], };
        dispatch(action);
    }
};

export const blurHandler = (dispatch: Dispatch<BlurAction>) => {
    const action: BlurAction = { type: INPUT_ACTIONS.TOUCH };
    dispatch(action);
};

export const uploadHandler = (dispatch: Dispatch<ValueAction>, value: string) => {
    const action: ValueAction = { type: INPUT_ACTIONS.VALUE, payload: value };
    dispatch(action);
};

export const previewHandler = async (dispatch: Dispatch<PreviewAction>, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const preview = await getImagePreview(e.target.files[0]);
        const action: PreviewAction = { type: INPUT_ACTIONS.PREVIEW, payload: preview };
        dispatch(action);
    }
};

export const resetHandler = (dispatch: Dispatch<ResetAction>) => dispatch({ type: INPUT_ACTIONS.RESET });

