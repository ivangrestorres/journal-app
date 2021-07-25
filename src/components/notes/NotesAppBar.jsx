import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active: note } = useSelector((state) => state.notes);

    const handleSaveNote = () => {
        dispatch(startSaveNote(note));
    };

    const handleFileChange = ({ target }) => {
        const file = target.files[0];
        if (file) {
            dispatch(startUploading(file));
        }
    };

    const handlePicture = () => {
        document.querySelector("#fileSelector").click();
    };

    return (
        <div className={"notes_appbar"}>
            <span>28 de agosto de 2020</span>
            <input
                id={"fileSelector"}
                onChange={handleFileChange}
                type="file"
                style={{ display: "none" }}
            />
            <div>
                <button onClick={handlePicture} className={"btn"}>
                    Picture
                </button>
                <button onClick={handleSaveNote} className={"btn"}>
                    Save
                </button>
            </div>
        </div>
    );
};
