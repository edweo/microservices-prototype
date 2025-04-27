import {NoteInfo} from "../NotesApp.tsx";

export function validateNote(note: NoteInfo) {
  if (note.title.length == 0) return false
  if (note.description.length == 0) return false
  return true
}