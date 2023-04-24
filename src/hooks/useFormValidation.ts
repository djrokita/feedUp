import { useEffect, useState } from "react";

export function useFormValidation(inputValids: boolean[]) {
    const [isFormValid, setFormValid] = useState(false);

    useEffect(() => {
        const isValid = inputValids.every(valid => valid);

        setFormValid(isValid);

    }, inputValids);

    return isFormValid;
}