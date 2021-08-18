import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";
import Swal from "sweetalert2";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector((state) => state.ui);

    const initialForm = {
        name: "",
        email: "",
        password: "",
        password2: "",
    };

    const [formValues, handleInputChange] = useForm(initialForm);
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            Swal.fire("Fail", "Name incorrect", "error");
            return false;
        }
        if (!validator.isEmail(email)) {
            Swal.fire("Fail", "Email incorrect", "error");
            return false;
        }
        if (password !== password2 || password.length < 5) {
            Swal.fire("Fail", "Password incorrect", "error");
            return false;
        }
        return true;
    };

    return (
        <div>
            <h3 className={"auth_title"}>Register</h3>
            <form
                onSubmit={handleRegister}
                className={"animate__animated animate__fadeIn animate__faster"}
            >
                {msgError && (
                    <div className={"auth_alert-error"}>{msgError}</div>
                )}
                <input
                    type="text"
                    placeholder={"Name"}
                    name={"name"}
                    value={name}
                    className={"auth_input"}
                    autoComplete={"off"}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder={"Email"}
                    name={"email"}
                    value={email}
                    className={"auth_input"}
                    autoComplete={"off"}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder={"Password"}
                    name={"password"}
                    value={password}
                    className={"auth_input"}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder={"Confirm password"}
                    name={"password2"}
                    value={password2}
                    className={"auth_input"}
                    onChange={handleInputChange}
                />
                <button
                    className={"btn btn-primary btn-block mt-5 mb-5"}
                    type={"submit"}
                >
                    Register
                </button>
                <Link className={"link"} to={"/auth/login"}>
                    Already register?
                </Link>
            </form>
        </div>
    );
};
