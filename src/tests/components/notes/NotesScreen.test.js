import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { NoteScreen } from "../../../components/notes/NoteScreen";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/notes", () => ({
    activeNote: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    notes: {
        active: { id: 1234, title: "Hola", body: "Mundo", date: 0 },
        notes: [],
    },
};
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Pruebas <NotesScreen />", () => {
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen></NoteScreen>
        </Provider>
    );
    test("debe de mostrar correctamente", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("debe de disparar el active note", () => {
        wrapper.find("input[name='title']").simulate("change", {
            target: {
                name: "title",
                value: "Hola de nuevo",
            },
        });

        expect(activeNote).toHaveBeenLastCalledWith(1234, {
            body: "Mundo",
            title: "Hola de nuevo",
            id: 1234,
            date: 0,
        });
    });
});
