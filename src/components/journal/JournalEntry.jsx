import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, title, body, url, date }) => {
    const dispatch = useDispatch();
    const noteDate = moment(date);

    const handleOnClick = () => {
        dispatch(activeNote(id, { title, body, url, date }));
    };

    return (
        <div
            onClick={handleOnClick}
            className={
                "journal_entry animate__animated animate__fadeIn animate__faster"
            }
        >
            {url && (
                <div
                    className="journal_entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${url})`,
                    }}
                ></div>
            )}
            <div className={"journal_entry-body"}>
                <p className={"journal_entry-title"}>{title}</p>
                <p className={"journal_entry-content"}>{body}</p>
            </div>
            <div className={"journal_entry-date-box"}>
                <span>{noteDate.format("ddd")}</span>
                <h4>{noteDate.format("Do")}</h4>
            </div>
        </div>
    );
};
