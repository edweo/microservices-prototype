import {NoteInfo} from "../NotesApp.tsx";
import {serverUrl} from "../../../../../global_variables.ts";

export default async function createNote(title: string, description: string): Promise<NoteInfo> {
  const url: string = `${serverUrl}/notes`

  const body = {
    "title": title,
    "description": description
  }

  let res: Response
  try {
    res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body)
    })

    if (res.status === 200) {
      return await res.json()
    } else throw new Error(await res.text())
  } catch (e) {
    throw e
  }
}