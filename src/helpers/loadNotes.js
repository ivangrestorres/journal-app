import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
    const notesSnap = db.collection(`${uid}/journal/notes`).get();
    const notes = [];

    (await notesSnap).forEach((noteSnap) => {
        notes.push({ id: noteSnap.id, ...noteSnap.data() });
    });

    return notes;
};
