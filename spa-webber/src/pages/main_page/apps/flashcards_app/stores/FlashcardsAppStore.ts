import {create} from "zustand";
import FlashcardGroupData from "../models/FlashcardGroupData.ts";
import FlashcardData from "../models/FlashcardData.ts";

interface FlashcardsAppStore {
  // Flashcard groups created by user
  flashcardGroups: FlashcardGroupData[],
  setFlashcardsGroups: (groups: FlashcardGroupData[]) => void,

  // Currently selected group by user in app
  currentFlashcardGroup: string | null,
  setCurrentFlashcardGroup: (group: string | null) => void,

  // Flashcards for specific group
  flashcardsCurrentGroup: FlashcardData[],
  setFlashcardsCurrentGroup: (flashcards: FlashcardData[]) => void,
  addFlashcardCurrentGroup: (f: FlashcardData) => void,

  // Currently selected flashcard
  currentlySelectedFlashCard: FlashcardData | null,
  setCurrentlySelectedFlashcard: (card: FlashcardData | null) => void
}

export const useFlashcardsAppStore = create<FlashcardsAppStore>((set, get) => ({
  flashcardGroups: [],
  setFlashcardsGroups: (groups: FlashcardGroupData[]) => set({flashcardGroups: groups}),

  currentFlashcardGroup: null,
  setCurrentFlashcardGroup: (group: string | null) => set({currentFlashcardGroup: group}),

  flashcardsCurrentGroup: [],
  setFlashcardsCurrentGroup: (flashcards: FlashcardData[]) => set({flashcardsCurrentGroup: flashcards}),
  addFlashcardCurrentGroup: (f: FlashcardData) => set({flashcardsCurrentGroup: [...get().flashcardsCurrentGroup, f]}),

  currentlySelectedFlashCard: null,
  setCurrentlySelectedFlashcard: (c: FlashcardData | null) => set({currentlySelectedFlashCard: c})
}))
