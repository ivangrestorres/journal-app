import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { loading, msgLoginError } = useSelector((state) => state.ui);

    const initialForm = {
        email: "kk@gmail.com",
        password: "12345aA",
    };
    const [formValues, handleInputChange] = useForm(initialForm);

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    };

    return (
        <div>
            <h3 className={"auth_title"}>Login</h3>
            {msgLoginError && (
                <div className={"auth_alert-error"}>{msgLoginError}</div>
            )}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder={"Email"}
                    name={"email"}
                    className={"auth_input"}
                    autoComplete={"off"}
                    value={email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder={"Password"}
                    name={"password"}
                    className={"auth_input"}
                    value={password}
                    onChange={handleInputChange}
                />
                <button
                    className={"btn btn-primary btn-block"}
                    type={"submit"}
                    disabled={loading}
                >
                    Login
                </button>

                <div className={"auth_social-networks"}>
                    <p>Login with social networks</p>
                    <div className="google-btn" onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper">
                            <img
                                className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button"
                            />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <Link className={"link"} to={"/auth/register"}>
                    Create new account
                </Link>
            </form>
        </div>
    );
};
