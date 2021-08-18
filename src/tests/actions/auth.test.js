import thunk from "redux-thunk";
import configureStore from "redux-mock-store";

import "@testing-library/jest-dom";

import {
    login,
    logout,
    startLoginEmailPassword,
    startLogout,
} from "../../actions/auth";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

describe("Pruebas actions Auth", () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test("Login y Logout deben llamar a la accion respectiva", () => {
        const loginAction = login("TEST", "Ivan");
        expect(loginAction).toEqual({
            type: types.login,
            payload: { uid: "TEST", displayName: "Ivan" },
        });

        const logoutAction = logout();
        expect(logoutAction).toEqual({
            type: types.logout,
        });
    });

    test("debe realizar el startLogout", async () => {
        await store.dispatch(startLogout());
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.logout,
        });

        expect(actions[1]).toEqual({
            type: types.notesLogoutCleaning,
        });
    });

    test("debe de iniciar el startLoginEmailPassword", async () => {
        await store.dispatch(
            startLoginEmailPassword("test@testing.com", "123456")
        );

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.uiStartLoading,
            payload: true,
        });

        expect(actions[1]).toEqual({
            type: types.login,
            payload: {
                uid: "m85vXNgXpTTQ5DN1XRPjLfXSrMA2",
                displayName: null,
            },
        });

        expect(actions[2]).toEqual({
            type: types.uiFinishLoading,
            payload: false,
        });
    });
});
