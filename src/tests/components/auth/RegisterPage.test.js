import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router";
import { RegisterPage } from "../../../components/auth/RegisterPage";
import { startRegisterWithEmailPasswordName } from "../../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/auth", () => ({
    startRegisterWithEmailPasswordName: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        notes: [],
        active: null,
    },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas <RegisterPage />", () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        </Provider>
    );

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de disparar la accion de startRegisterWithEmailPasswordName", () => {
        wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
        expect(startRegisterWithEmailPasswordName).not.toHaveBeenCalled();

        wrapper.find("input[name='name']").simulate("change", {
            target: { value: "Ivan", name: "name" },
        });

        wrapper.find("input[name='email']").simulate("change", {
            target: { value: "a@gmail.com", name: "email" },
        });

        wrapper.find("input[name='email']").simulate("change", {
            target: { value: "12345aA", name: "password" },
        });

        wrapper.find("input[name='email']").simulate("change", {
            target: { value: "12345aA", name: "password2" },
        });

        wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
        expect(startRegisterWithEmailPasswordName).toHaveBeenLastCalledWith(
            "a@gmail.com",
            "12345aA",
            "Ivan"
        );
    });
});
