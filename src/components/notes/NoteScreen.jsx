import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
    const dispatch = useDispatch();

    const { active: note } = useSelector((state) => state.notes);

    const [formValues, handleInputChange, reset] = useForm(note);
    const { title, body } = formValues;

    const activeId = useRef(note.id);

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, { ...formValues }));
    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeleting(note.id));
    };

    return (
        <div className={"notes_main-content"}>
            <NotesAppBar />
            <div className={"notes_content"}>
                <input
                    type="text"
                    placeholder={"Some awesome title"}
                    className={"notes_title-input"}
                    name={"title"}
                    value={title}
                    onChange={handleInputChange}
                    autoComplete={"off"}
                />
                <textarea
                    placeholder={"What happened today"}
                    value={body}
                    name={"body"}
                    onChange={handleInputChange}
                    className={"notes_textarea"}
                ></textarea>
                {note.url && (
                    <div>
                        <img
                            src={note.url}
                            alt="imagen"
                            className={"notes_image"}
                        />
                    </div>
                )}
            </div>
            <button onClick={handleDelete} className={"btn btn-danger"}>
                Delete
            </button>
        </div>
    );
};
