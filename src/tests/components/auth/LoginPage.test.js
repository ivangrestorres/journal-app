import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { LoginPage } from "../../../components/auth/LoginPage";
import { MemoryRouter } from "react-router";
import {
    startGoogleLogin,
    startLoginEmailPassword,
} from "../../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/auth", () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas <LoginPage />", () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        </Provider>
    );

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de disparar la accion de startGoogleLogin", () => {
        wrapper.find(".google-btn").prop("onClick")();

        expect(startGoogleLogin).toHaveBeenCalled();
    });

    test("debe de disparar la accion de startLoginEmailPassword", () => {
        wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
        expect(startLoginEmailPassword).toHaveBeenCalledWith("", "");
    });
});
