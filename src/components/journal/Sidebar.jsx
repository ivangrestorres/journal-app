import React from "react";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
    return (
        <aside className={"journal_sidebar"}>
            <div className={"journal_sidebar-navbar"}>
                <h3 className={"mt-5"}>
                    <i className={"far fa-user"}></i>
                    <span> Fernando</span>
                </h3>
                <button className={"btn"}>Logout</button>
            </div>
            <div className={"journal_new-entry"}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>
            <JournalEntries />
        </aside>
    );
};
