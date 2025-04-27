import {NoteInfo} from "../NotesApp.tsx";
import {serverUrl} from "../../../../../global_variables.ts";

export default async function deleteNote(note: NoteInfo): Promise<boolean> {
  const url: string = `${serverUrl}/notes/${note.id}`
  let res: Response
  try {
    res = await fetch(url, {
      credentials: "include",
      method: "DELETE",
    })
    if (res.status === 200) {
      return true
    } else return false
  } catch (e) {
    throw e
  }
}