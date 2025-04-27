import {serverUrl} from "../../../../../global_variables.ts";
import FlashcardGroupData from "../models/FlashcardGroupData.ts";

export default async function fetchGetFlashcardGroups(): Promise<FlashcardGroupData[]> {
  const url = `${serverUrl}/flashcards/groups`
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