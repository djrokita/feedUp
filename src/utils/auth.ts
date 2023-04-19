import { AuthToken } from "../types";

export function saveToken(token: AuthToken) {
    localStorage.setItem('token', token);
}

export function retrieveToken() {
    return localStorage.getItem('token');
}

export function checkIsAuth() {
    return retrieveToken() ? true : false;
}