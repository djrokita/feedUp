import { Actions, INPUT_ACTIONS } from "../types";
import { email, required, length } from "../utils/validators";

export const initState = {
    value: '',
    valid: false,
    touched: false,
};

export function validateEmail(value: string) {
    return required(value) && email(value);
}

export function validatePassword(value: string) {
    return required(value) && length({ min: 5 })(value);
}

export function inputReducer<T extends Actions>(state: typeof initState, action: T) {
    switch (action.type) {
        case INPUT_ACTIONS.VALUE:
            const validator = action.id === "email" ? validateEmail : validatePassword;
            return { ...state, value: action.payload, valid: validator(action.payload) };
        case INPUT_ACTIONS.TOUCH:
            return { ...state, touched: action.payload };
        default:
            throw new Error('Wrong action type');
    }
}