import { Form, redirect } from "react-router-dom";

import BaseAuth from "./BaseAuth/BaseAuth";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { saveToken } from "../../utils/auth";
import { AuthResponse } from "../../types";

interface LoginProps {

}

const Login = () => {

    const kurwa = (a: string, b: string) => null;

    return (
        <BaseAuth>
            <Form method="POST">
                <Input
                    id="email"
                    label="Your E-Mail"
                    type="email"
                    touched="touched"
                    value="krzych.pierzchala@gmail.com"
                    valid={true}
                    onChange={kurwa}
                    onBlur={() => null}
                    required={true}
                // onChange={this.inputChangeHandler}
                // onBlur={this.inputBlurHandler.bind(this, 'email')}
                // value={this.state.loginForm['email'].value}
                // valid={this.state.loginForm['email'].valid}
                // touched={this.state.loginForm['email'].touched}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    touched="touched"
                    value="Krzych"
                    valid={true}
                    onChange={kurwa}
                    onBlur={() => null}
                    required={true}
                // onChange={this.inputChangeHandler}
                // onBlur={this.inputBlurHandler.bind(this, 'password')}
                // value={this.state.loginForm['password'].value}
                // valid={this.state.loginForm['password'].valid}
                // touched={this.state.loginForm['password'].touched}
                />
                <Button design="raised" loading={false} text="Login" disabled={false} />
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