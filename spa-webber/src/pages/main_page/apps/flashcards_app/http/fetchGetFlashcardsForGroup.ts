import {serverUrl} from "../../../../../global_variables.ts";
import FlashcardData from "../models/FlashcardData.ts";

export default async function fetchGetFlashcardsForGroup(groupName: string): Promise<FlashcardData[]> {
  const url = `${serverUrl}/flashcards/groups/${groupName}`
  let res: Response
  try {
    res = await fetch(url, {
      credentials: "include"
    })
    if (res.status === 200) return await res.json()
    throw new Error(await res.text())
  } catch (e) {
    throw e
  }
}