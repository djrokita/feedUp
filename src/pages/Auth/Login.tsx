import { Form, redirect, useNavigation } from "react-router-dom";

import BaseAuth from "./BaseAuth/BaseAuth";
import Button from "../../components/Button/Button";
import { saveToken } from "../../utils/auth";
import { AuthResponse } from "../../types";
import { buttonStyles } from "../../utils/buttonStyles";
import { email, length, required } from '../../utils/validators';
import TextField from "../../components/TextField/TextField";
import { useInput } from '../../hooks/useInput';
import { useFormValidation } from '../../hooks/useFormValidation';

const Login = () => {
    const { input: emailState, changeHandler: onEmailChange, blurHandler: onEmailBlur } = useInput([required, email]);
    const { input: passwordState, changeHandler: onPasswordChange, blurHandler: onPasswordBlur } = useInput([required, length({ min: 5 })]);
    const navigation = useNavigation();

    const loading = navigation.state === "submitting" || navigation.state === "loading";

    const isFormValid = useFormValidation([emailState.valid, passwordState.valid]);

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
                        onChange={onEmailChange}
                        onBlur={onEmailBlur}

                    />
                </TextField>
                <TextField id="password" label="Password" valid={passwordState.valid} touched={passwordState.touched}>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={passwordState.value}
                        required={true}
                        onChange={onPasswordChange}
                        onBlur={onPasswordBlur}

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