import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { firebase } from "../firebase/firebase-config";

import { JournalPage } from "../components/journal/JournalPage";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { useState } from "react";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoogedIn, setIsLoogedIn] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                dispatch(startLoadingNotes(user.uid));

                setIsLoogedIn(true);
            } else {
                setIsLoogedIn(false);
            }
            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoogedIn]);

    if (checking) return <h1>Wait...</h1>;

    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute
                        exact
                        path={"/"}
                        isAuthenticated={isLoogedIn}
                        component={JournalPage}
                    />
                    <PublicRoute
                        path={"/auth"}
                        isAuthenticated={isLoogedIn}
                        component={AuthRouter}
                    />
                    <Redirect to={"auth/login"} />
                </Switch>
            </div>
        </Router>
    );
};
