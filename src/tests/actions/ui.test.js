import { finishLoading, startLoading } from "../../actions/ui";
import { types } from "../../types/types";

describe("Pruebas UI", () => {
    test("todas las acciones deben funcionar correctamente", () => {
        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading,
            payload: true,
        });

        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading,
            payload: false,
        });
    });
});
