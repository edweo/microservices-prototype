import {NoteInfo} from "../NotesApp.tsx";
import {Dialog} from "@mui/material";
import WebberButton from "../../../../../components/WebberButton.tsx";
import {useState} from "react";
import WebberInputField from "../../../../../components/WebberInputField.tsx";
import WebberTextArea from "../../../../../components/WebberTextArea.tsx";

interface Props {
  isDialogOpen: boolean,
  ondDialogClose: () => void,
  currentNote: NoteInfo,
  updateNote: (note: NoteInfo) => Promise<boolean>,
}

export default function DialogEditNote({isDialogOpen, ondDialogClose, currentNote, updateNote}: Props) {
  const [note, setNote] = useState<NoteInfo>({title: currentNote.title, description: currentNote.description, id: currentNote.id})

  return(
      <Dialog fullWidth open={isDialogOpen} onClose={ondDialogClose}>
        <div className="flex flex-col p-4 rounded bg-secondary">
          <h1 className="text-2xl mb-8 text-onSecondary">Edit Note</h1>
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
          <WebberButton text="EDIT"
                        onClick={async () => {
                          if (await updateNote(note)) {
                            ondDialogClose()
                          }
                        }}
                        styleContainer="bg-primary mt-4"
                        styleText="text-onSecondary"
          />
        </div>
      </Dialog>
  )
}