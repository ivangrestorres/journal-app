import { types } from "../types/types";

export const startLoading = () => ({
    type: types.uiStartLoading,
    payload: true,
});

export const finishLoading = () => ({
    type: types.uiFinishLoading,
    payload: false,
});
