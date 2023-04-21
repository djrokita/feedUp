import { Form, redirect, useNavigation } from "react-router-dom";
import { ChangeEvent, useReducer, useEffect, useState } from 'react';

import BaseAuth from "./BaseAuth/BaseAuth";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { saveToken } from "../../utils/auth";
import { Actions, AuthResponse, BlurAction, INPUT_ACTIONS, ValueAction } from "../../types";
import { buttonStyles } from "../../utils/buttonStyles";
import { email, length, required } from '../../utils/validators';

const initState = {
    value: '',
    valid: false,
    touched: false,
};

//   formIsValid: false

function validateEmail(value: string) {
    return required(value) && email(value);
}

function validatePassword(value: string) {
    return required(value) && length({ min: 5 })(value);
}

function inputReducer<T extends Actions>(state: typeof initState, action: T) {
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

const Login = () => {
    const [isFormValid, setFormValid] = useState(false);
    const [emailState, dispatchEmail] = useReducer(inputReducer, initState);
    const [passwordState, dispatchPassword] = useReducer(inputReducer, initState);
    const navigation = useNavigation();

    const loading = navigation.state === "submitting" || navigation.state === "loading";

    useEffect(() => {
        const isValid = emailState.valid && passwordState.valid;

        setFormValid(isValid);

    }, [emailState.valid, passwordState.valid]);

    const changeHandler = (id: "email" | "password", e: ChangeEvent<HTMLInputElement>) => {
        const action = { type: INPUT_ACTIONS.VALUE, payload: e.target.value, id };
        id === "email" ? dispatchEmail(action as ValueAction) : dispatchPassword(action as ValueAction);
    };


    const blurHandler = (id: "email" | "password") => {
        const action = { type: INPUT_ACTIONS.TOUCH, payload: true, id };
        id === "email" ? dispatchEmail(action as BlurAction) : dispatchPassword(action as BlurAction);
    };

    return (
        <BaseAuth>
            <Form method="POST">
                <Input<"email">
                    id="email"
                    label="Your E-Mail"
                    type="email"
                    touched={emailState.touched}
                    value={emailState.value}
                    valid={emailState.valid}
                    required={true}
                    onChange={changeHandler.bind(null, "email")}
                    onBlur={blurHandler.bind(null, "email")}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    touched={passwordState.touched}
                    value={passwordState.value}
                    valid={passwordState.valid}
                    onChange={changeHandler.bind(null, "password")}
                    onBlur={blurHandler.bind(null, "password")}
                    required={true}
                />
                <Button btnStyles={buttonStyles("raised")} text="Login" disabled={!isFormValid} loading={loading} />
            </Form>
        </BaseAuth >
    );
};

export default Login;

export async function action({ request }: { request: Request; }) {
    const formData = await request.formData();

    const body = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    console.log("🚀 ~ file: Login.tsx:66 ~ action ~ body:", body);

    const url = 'http://localhost:8080/auth/login';

    const response = await fetch(url, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw response;
    }

    const authData: AuthResponse = await response.json();

    saveToken(authData.token);

    return redirect('/');
}