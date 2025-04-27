import {NoteInfo} from "../NotesApp.tsx";
import {serverUrl} from "../../../../../global_variables.ts";

export default async function updateNote(note: NoteInfo): Promise<boolean> {
  const url: string = `${serverUrl}/notes/${note.id}`
  const body = {
    "title": note.title,
    "description": note.description
  }
  let res: Response
  try {
    res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "PUT",
      body: JSON.stringify(body)
    })
    if (res.status === 200) return true
    return false
  } catch (e) {
    throw e
  }
}