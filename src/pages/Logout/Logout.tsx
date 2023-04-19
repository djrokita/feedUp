import { useEffect } from 'react';
import { redirect, useSubmit } from "react-router-dom";

const Logout = () => {
    const submit = useSubmit();

    useEffect(() => submit(null, { method: "POST" }), [submit]);

    return null;
};

export default Logout;

export function action() {
    localStorage.removeItem('token');

    return redirect('/');
}