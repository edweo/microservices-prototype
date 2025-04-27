import WebberInputField from "../../../../../components/WebberInputField.tsx";
import WebberTextArea from "../../../../../components/WebberTextArea.tsx";
import WebberButton from "../../../../../components/WebberButton.tsx";
import {Dialog} from "@mui/material";
import {useState} from "react";
import FlashcardData from "../models/FlashcardData.ts";
import fetchCreateFlashcard from "../http/fetchCreateFlashcard.ts";
import {useFlashcardsAppStore} from "../stores/FlashcardsAppStore.ts";
import fetchWrapper from "../../../../../functions/fetchWrapper.ts";

interface Props {
  open: boolean,
  onClose: () => void,
}

function CreateFlashcardDialog({open, onClose}: Props) {
  const [newFlashcard, setNewFlashcard] = useState<FlashcardData>({id: "", prompt: "", answer: ""})

  // Global app store
  const currentGroup = useFlashcardsAppStore(s => s.currentFlashcardGroup)
  const addFlashcard = useFlashcardsAppStore(s => s.addFlashcardCurrentGroup)

  function createFlashcard(f: FlashcardData, group: string) {
    fetchWrapper<FlashcardData>(
        () => fetchCreateFlashcard(group, f),
        (data: FlashcardData) => {
          addFlashcard(data)
          onClose()
        },
        (e: Error) => {
          console.log("Error", e.message)
        }
    )
  }

  return (
      <Dialog open={open} onClose={onClose} fullWidth={true} >
        <div className="flex flex-col p-4 rounded bg-secondary">
          <h1 className="text-2xl mb-8 text-onSecondary">Create Flashcard</h1>
          <WebberInputField value={newFlashcard.prompt}
                            setValue={(value) => setNewFlashcard({...newFlashcard, prompt: value})}
                            preventEvents={true}
                            label="Prompt"
                            className="w-full"
          />
          <WebberTextArea value={newFlashcard.answer}
                          setValue={(value) => setNewFlashcard({...newFlashcard, answer: value})}
                          preventEvents={true}
                          label="Answer"
                          className="mt-4"
                          rows={5}
          />
          <WebberButton text="SAVE"
                        onClick={() => createFlashcard(newFlashcard, currentGroup!)}
                        styleContainer="bg-primary mt-4"
                        styleText="text-onSecondary"
          />
        </div>
      </Dialog>
  );
}

export default CreateFlashcardDialog;