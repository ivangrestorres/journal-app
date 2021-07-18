import React from "react";

export const JournalEntry = () => {
    return (
        <div className={"journal_entry"}>
            <div
                className="journal_entry-picture"
                style={{
                    backgroundSize: "cover",
                    backgroundImage:
                        "url(https://st3.depositphotos.com/1813774/19042/i/600/depositphotos_190424116-stock-photo-historical-medieval-city-along-the.jpg)",
                }}
            ></div>
            <div className={"journal_entry-body"}>
                <p className={"journal_entry-title"}>Un nuevo dia</p>
                <p className={"journal_entry-content"}>
                    Est sint officia fugiat irure anim magna aliquip sit qui
                    mollit enim nisi occaecat anim. Ut duis aute mollit culpa
                    deserunt eiusmod incididunt aute cillum officia non. Aute
                    nisi aute anim in dolor et anim eu. Officia duis dolore
                    pariatur ut elit cupidatat dolor nostrud.
                </p>
            </div>
            <div className={"journal_entry-date-box"}>
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    );
};
