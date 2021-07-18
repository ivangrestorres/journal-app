import React from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <div>
            <h3 className={"auth_title"}>Register</h3>
            <form action="">
                <input
                    type="text"
                    placeholder={"Name"}
                    name={"name"}
                    className={"auth_input"}
                    autoComplete={"off"}
                />
                <input
                    type="text"
                    placeholder={"Email"}
                    name={"email"}
                    className={"auth_input"}
                    autoComplete={"off"}
                />
                <input
                    type="password"
                    placeholder={"Password"}
                    name={"password"}
                    className={"auth_input"}
                />
                <input
                    type="password"
                    placeholder={"Confirm password"}
                    name={"password2"}
                    className={"auth_input"}
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
