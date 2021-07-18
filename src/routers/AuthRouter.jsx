import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { LoginPage } from '../components/auth/LoginPage'
import { RegisterPage } from '../components/auth/RegisterPage'

export const AuthRouter = () => {
    return (
        <div className={"auth_main"}>
            <div className={"auth_box-container"}>
                <Switch>
                    <Route path={"/auth/login"} component={LoginPage} />
                    <Route exact path={"/auth/register"} component={RegisterPage} />
                    <Redirect to={"/auth/login"} />
                </Switch>
            </div>
        </div>
    )
}
