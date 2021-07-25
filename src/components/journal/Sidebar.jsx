import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { addNote } from "../../actions/notes";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
    const dispatch = useDispatch();
    const { name } = useSelector((state) => state.auth);

    const handleLogOut = () => {
        dispatch(startLogout());
    };

    const handleAddNewNote = () => {
        dispatch(addNote());
    };

    return (
        <aside className={"journal_sidebar"}>
            <div className={"journal_sidebar-navbar"}>
                <h4 className={"mt-1"}>
                    <i className={"far fa-user"}></i>
                    <span> {name}</span>
                </h4>
                <button onClick={handleLogOut} className={"btn"}>
                    Logout
                </button>
            </div>
            <div onClick={handleAddNewNote} className={"journal_new-entry"}>
                <i className="far fa-calendar-plus fa-3x"></i>
                <p className="mt-5">New entry</p>
            </div>
            <JournalEntries />
        </aside>
    );
};
