import { useState } from "react";

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const handleOnChange = ({ target }) => {
        setValues({ ...values, [target.name]: target.value });
    };

    const reset = (newState = initialState) => {
        setValues(newState);
    };

    return [values, handleOnChange, reset];
};
