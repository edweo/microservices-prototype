import {serverUrl} from "../../../../../global_variables.ts";
import FlashcardData from "../models/FlashcardData.ts";

export default async function fetchCreateFlashcard(groupName: string, flashcard: FlashcardData): Promise<FlashcardData> {
  const url = `${serverUrl}/flashcards/groups/${groupName}`
  const body = {
    "prompt": flashcard.prompt,
    "answer": flashcard.answer
  }
  let res: Response
  try {
    res = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body)
    })
    if (res.status === 200) return await res.json()
    throw new Error(await res.text())
  } catch (e) {
    throw e
  }
}