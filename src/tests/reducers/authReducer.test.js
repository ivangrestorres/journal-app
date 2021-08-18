import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("AuthReducer", () => {
    test("debe hacer login", () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: { uid: "123", displayName: "Ivan" },
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({ uid: "123", name: "Ivan" });
    });

    test("debe hacer logout", () => {
        const initState = { uid: "123", name: "Ivan" };
        const action = {
            type: types.logout,
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({});
    });

    test("no debe modificar nada ", () => {
        const initState = { uid: "123", name: "Ivan" };
        const action = {
            type: "aaaa",
        };

        const state = authReducer(initState, action);

        expect(state).toEqual({ uid: "123", name: "Ivan" });
    });
});
