import {serverUrl} from "../../../../../global_variables.ts";
import {NoteInfo} from "../NotesApp.tsx";

export default async function getNotes(): Promise<NoteInfo[]> {
  const url: string = `${serverUrl}/notes`
  let res: Response
  try {
    res = await fetch(url, {
      credentials: "include",
    })
    if (res.status === 200) {
      return await res.json()
    } else throw new Error(await res.text())
  } catch (e) {
    throw e
  }
}