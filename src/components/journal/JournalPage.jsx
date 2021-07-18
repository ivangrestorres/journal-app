import React from "react";
import { NoteScreen } from "../notes/NoteScreen";
// import { NothingSelected } from "./NothingSelected";
import { Sidebar } from "./Sidebar";

export const JournalPage = () => {
    return (
        <div className={"journal_main-content"}>
            <Sidebar />
            <main>
                {/* <NothingSelected /> */}
                <NoteScreen />
            </main>
        </div>
    );
};
