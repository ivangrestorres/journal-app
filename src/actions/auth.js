import { types } from "../types/types";
import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebase-config";

import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                const { uid, displayName } = user;
                dispatch(login(uid, displayName));
            })
            .catch(({ message }) => {
                Swal.fire("Fail", message, "error");
            })
            .finally(() => dispatch(finishLoading()));
    };
};

export const login = (uid, displayName) => ({
    type: types.login,
    payload: { uid, displayName },
});

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch(logout());
    };
};

export const logout = () => ({
    type: types.logout,
});

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                const { uid, displayName } = user;
                dispatch(login(uid, displayName));
            });
    };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                const { uid, displayName } = user;
                dispatch(login(uid, displayName));
            })
            .catch(({ message }) => {
                Swal.fire("Fail", message, "error");
            });
    };
};
