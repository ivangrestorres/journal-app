import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { Sidebar } from "../../../components/journal/Sidebar";
import { startLogout } from "../../../actions/auth";
import { addNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/auth", () => ({
    startLogout: jest.fn(),
}));

jest.mock("../../../actions/notes", () => ({
    addNote: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: {},
        notes: [],
    },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas en <Sidebar />", () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <Sidebar></Sidebar>
        </Provider>
    );

    test("debe de mostrarse correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de llamar al logout", () => {
        wrapper.find("button").prop("onClick")();
        expect(startLogout).toHaveBeenCalled();
    });

    test("debe de llamar el startNewNote", () => {
        wrapper.find(".journal_new-entry").prop("onClick")();
        expect(addNote).toHaveBeenCalled();
    });
});
