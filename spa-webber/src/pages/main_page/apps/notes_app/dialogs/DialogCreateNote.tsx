import {Dialog} from "@mui/material";
import {NoteInfo} from "../NotesApp.tsx";
import {useState} from "react";
import WebberButton from "../../../../../components/WebberButton.tsx";
import {validateNote} from "../utils/NoteValidation.ts";
import WebberInputField from "../../../../../components/WebberInputField.tsx";
import WebberTextArea from "../../../../../components/WebberTextArea.tsx";

interface Props {
  isDialogOpen: boolean,
  ondDialogClose: () => void,
  createNote: (note: NoteInfo) => void,
}

export default function DialogCreateNote({isDialogOpen, ondDialogClose, createNote}: Props) {
  const [note, setNote] = useState<NoteInfo>({title: "", description: "", id: ""})

  function submitForm() {
    if (!validateNote(note)) return
    createNote(note)
    setNote({title: "", description: "", id: ""})
  }

  return(
      <Dialog fullWidth open={isDialogOpen} onClose={ondDialogClose}>
        <div className="flex flex-col p-4 bg-secondary">
          <h1 className="text-2xl mb-8 text-onSecondary">New Note</h1>
          <WebberInputField value={note.title}
                            setValue={(value) => setNote({...note, title: value})}
                            preventEvents={true}
                            label="Title"
          />
          <WebberTextArea value={note.description}
                          setValue={(value) => setNote({...note, description: value})}
                          preventEvents={true}
                          label="Description"
                          className="mt-4"
                          rows={5}
          />
          <WebberButton text="CREATE"
                        onClick={submitForm}
                        styleContainer="bg-primary mt-4"
                        styleText="text-onSecondary"
          />
        </div>
      </Dialog>
  )
}