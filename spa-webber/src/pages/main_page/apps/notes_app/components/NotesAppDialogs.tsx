import DialogCreateNote from "../dialogs/DialogCreateNote.tsx";
import DialogEditNote from "../dialogs/DialogEditNote.tsx";
import {NoteInfo} from "../NotesApp.tsx";
import createNote from "../http/create_note.ts";

interface Props {
  setNotes: (value: React.SetStateAction<NoteInfo[]>) => void,
  dialogCreateOpen: boolean,
  setDialogCreateOpen: (open: boolean) => void,
  selectedNote: NoteInfo | null,
  setSelectedNote: (open: NoteInfo | null) => void,
  pingRefresh: boolean,
  setPingRefresh: (ping: boolean) => void,
  dialogEditOpen: boolean,
  setDialogEditOpen: (enable: boolean) => void,
  updateNote: (note: NoteInfo) => Promise<boolean>,
}

export default function NotesAppDialogs({setNotes,
                                          dialogCreateOpen,
                                          setDialogCreateOpen,
                                          selectedNote,
                                          setSelectedNote,
                                          dialogEditOpen,
                                          setDialogEditOpen,
                                          updateNote,
}: Props) {

  async function _createNote(note: NoteInfo) {
    setDialogCreateOpen(false)

    try {
      const newNote: NoteInfo = await createNote(note.title, note.description)
      setNotes((prevState) => {
        return [...prevState, newNote]
      })
    } catch (e: unknown) {
      console.log(e.message)
    }
  }

  return (
      <>
        <DialogCreateNote isDialogOpen={dialogCreateOpen}
                          ondDialogClose={() => setDialogCreateOpen(false)}
                          createNote={_createNote}
        />

        {selectedNote !== null &&
            <DialogEditNote isDialogOpen={dialogEditOpen}
                            ondDialogClose={() => {
                              setDialogEditOpen(false)
                              setSelectedNote(null)
                            }}
                            currentNote={selectedNote!}
                            updateNote={updateNote}
            />
        }
      </>
  );
}
