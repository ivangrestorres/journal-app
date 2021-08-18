/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    addNote,
    startLoadingNotes,
    startSaveNote,
    startUploading,
} from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: { uid: "TEST" },
    notes: {
        active: {
            id: "O7VTa5ybEyz7gF64Wkbx",
            title: "titulo",
            body: "body",
        },
    },
};

jest.mock("../../helpers/fileUpload", () => {
    return {
        fileUpload: () => {
            return Promise.resolve("Cualquierlinlk/cualquierimagen.jpg");
        },
    };
});

let store = mockStore(initState);

describe("Pruebas actions notes", () => {
    beforeEach(() => {
        store = mockStore(initState);
    });

    test("debe crear una nueva nota", async () => {
        await store.dispatch(addNote());

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            },
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: "",
                body: "",
                date: expect.any(Number),
            },
        });

        const docId = actions[0].payload.id;
        await db.doc(`/TEST/journal/notes/${docId}`).delete();
    });

    test("startLoadingNotes deben cargar todas la notas", async () => {
        await store.dispatch(startLoadingNotes("TEST"));

        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array),
        });

        const expected = {
            id: expect.any(String),
            body: expect.any(String),
            title: expect.any(String),
            date: expect.any(Number),
        };

        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test("startSaveNotes deben cargar todas la notas", async () => {
        const note = {
            id: "O7VTa5ybEyz7gF64Wkbx",
            title: "titulo",
            body: "body",
        };
        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();
        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/TEST/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe(note.title);
    });

    test("startUploading debe de actualizar la url de la nota ", async () => {
        const file = [];
        await store.dispatch(startUploading(file));

        const docRef = await db
            .doc(`/TEST/journal/notes/O7VTa5ybEyz7gF64Wkbx`)
            .get();

        expect(docRef.data().url).toBe("Cualquierlinlk/cualquierimagen.jpg");
    });
});
