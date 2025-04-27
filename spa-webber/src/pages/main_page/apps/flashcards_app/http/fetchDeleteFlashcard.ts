import {serverUrl} from "../../../../../global_variables.ts";
import FlashcardData from "../models/FlashcardData.ts";

export default async function fetchDeleteFlashcard(groupName: string, flashcard: FlashcardData): Promise<void> {
  const url = `${serverUrl}/flashcards/groups/${groupName}/${flashcard.id}`
  let res: Response
  try {
    res = await fetch(url, {
      credentials: "include",
      method: "DELETE",
    })
    if (res.status === 200) return
    throw new Error(await res.text())
  } catch (e) {
    throw e
  }
}