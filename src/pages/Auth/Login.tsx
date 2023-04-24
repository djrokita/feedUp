import { Form, redirect, useNavigation } from "react-router-dom";
import { ChangeEvent, useReducer, useEffect, useState } from 'react';

import BaseAuth from "./BaseAuth/BaseAuth";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { saveToken } from "../../utils/auth";
import { Actions, AuthResponse, BlurAction, INPUT_ACTIONS, ValueAction } from "../../types";
import { buttonStyles } from "../../utils/buttonStyles";
import { email, length, required } from '../../utils/validators';
import { initState, inputReducer, validateEmail, validatePassword } from '../../hooks/inputReducer';
import TextField from "../../components/TextField/Input";

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

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = e.target;
        const action = { type: INPUT_ACTIONS.VALUE, payload: value, id };
        id === "email" ? dispatchEmail(action as ValueAction) : dispatchPassword(action as ValueAction);
    };


    const blurHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const action = { type: INPUT_ACTIONS.TOUCH, payload: true, id };
        id === "email" ? dispatchEmail(action as BlurAction) : dispatchPassword(action as BlurAction);
    };

    return (
        <BaseAuth>
            <Form method="POST">
                <TextField id="email" label="Your E-Mail" valid={emailState.valid} touched={emailState.touched}>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={emailState.value}
                        required={true}
                        onChange={changeHandler}
                        onBlur={blurHandler}

                    />
                </TextField>
                <TextField id="password" label="Password" valid={emailState.valid} touched={emailState.touched}>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={passwordState.value}
                        required={true}
                        onChange={changeHandler}
                        onBlur={blurHandler}

                    />
                </TextField>
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