import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router";
import { AppRouter } from "../../routers/AppRouter";
import { firebase } from "../../firebase/firebase-config";
import { act } from "@testing-library/react";
import { login } from "../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../actions/auth", () => ({
    login: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {
            id: "abc",
        },
        notes: [],
    },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <AppRouter />", () => {
    test("debe llamar al login si estoy autenticado", async () => {
        let user;
        await act(async () => {
            const userCred = await firebase
                .auth()
                .signInWithEmailAndPassword("test@testing.com", "123456");

            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );
        });

        expect(login).toHaveBeenCalledWith(
            "m85vXNgXpTTQ5DN1XRPjLfXSrMA2",
            null
        );
    });
});
