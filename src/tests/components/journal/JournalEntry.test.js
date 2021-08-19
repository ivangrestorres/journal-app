import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import { JournalEntry } from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";

jest.mock("../../../actions/notes", () => ({
    activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: "Hola",
    body: "Mundo",
};

describe("Pruebas <JournalEntry />", () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry {...note}></JournalEntry>
        </Provider>
    );
    test("debe de mostrar correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de activar la nota", () => {
        wrapper.find(".journal_entry").prop("onClick")();
        expect(activeNote).toHaveBeenCalled();
    });
});
