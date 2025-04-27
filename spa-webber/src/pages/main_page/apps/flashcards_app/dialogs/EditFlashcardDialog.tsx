import {Dialog} from "@mui/material";
import FlashcardData from "../models/FlashcardData.ts";
import WebberInputField from "../../../../../components/WebberInputField.tsx";
import WebberTextArea from "../../../../../components/WebberTextArea.tsx";
import WebberButton from "../../../../../components/WebberButton.tsx";
import {useState} from "react";

interface Props {
  flashcard: FlashcardData,
  open: boolean,
  onClose: () => void,
}

function EditFlashcardDialog({flashcard ,open, onClose}: Props) {
  const [edited, setEdited] = useState<FlashcardData>({...flashcard})

  return (
      <Dialog open={open} onClose={onClose} fullWidth={true} >
        <div className="flex flex-col p-4 rounded bg-secondary">
          <h1 className="text-2xl mb-8 text-onSecondary">Edit Flashcard</h1>
          <WebberInputField value={edited.prompt}
                            setValue={(value) => setEdited({...edited, prompt: value})}
                            preventEvents={true}
                            label="Prompt"
                            className="w-full"
          />
          <WebberTextArea value={edited.answer}
                          setValue={(value) => setEdited({...edited, answer: value})}
                          preventEvents={true}
                          label="Answer"
                          className="mt-4"
                          rows={5}
          />
          <WebberButton text="SAVE"
                        onClick={() => {

                        }}
                        styleContainer="bg-primary mt-4"
                        styleText="text-onSecondary"
          />
        </div>
      </Dialog>
  );
}

export default EditFlashcardDialog;