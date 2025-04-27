import TopBar from "../components/TopBar.tsx";
import NotesViewGrid from "../components/NotesViewGrid.tsx";
import NotesAppDialogs from "../components/NotesAppDialogs.tsx";
import {NoteInfo} from "../NotesApp.tsx";
import {useState} from "react";
import {NotesAppPages} from "../NotesAppPages.ts";

interface Props {
  notes: NoteInfo[],
  pingRefresh: boolean,
  setNotes: (notes: NoteInfo[]) => void,
  setNotesPrev: (value: React.SetStateAction<NoteInfo[]>) => void,
  setSelectedNote: (note: NoteInfo) => void,
  setSelectedNoteNull: (note: NoteInfo | null) => void,
  selectedNote: NoteInfo | null,
  setPingRefresh: (ping: boolean) => void,
  setCurrentPage: (page: NotesAppPages) => void,
  deleteNote: (note: NoteInfo) => void,
  updateNote: (note: NoteInfo) => Promise<boolean>,
  fetchedNotes: boolean,
  isLoadingNotes: boolean,
  fetchAgainNotes: () => void,
}

function NotesAppMain({notes,
                        pingRefresh,
                        setSelectedNote,
                        setNotesPrev,
                        selectedNote,
                        setPingRefresh,
                        setSelectedNoteNull,
                        setCurrentPage,
                        deleteNote,
                        updateNote,
                        fetchedNotes,
                        isLoadingNotes,
                        fetchAgainNotes
}: Props) {
  const [searchResult, setSearchResult] = useState<NoteInfo[] | null>(null)
  const [dialogCreateOpen, setDialogCreateOpen] = useState(false)
  const [dialogEditOpen, setDialogEditOpen] = useState(false)

  return (
      <>
        <TopBar notes={notes}
                searchResult={searchResult}
                pingRefresh={pingRefresh}
                setSearchResult={setSearchResult}
                setDialogCreateOpen={setDialogCreateOpen}
                isLoadingNotes={isLoadingNotes}
        />

        <NotesViewGrid notes={notes}
                       searchResult={searchResult}
                       setSelectedNote={setSelectedNote}
                       setDialogEditOpen={setDialogEditOpen}
                       setCurrentPage={setCurrentPage}
                       deleteNote={deleteNote}
                       fetchedNotes={fetchedNotes}
                       isLoadingNotes={isLoadingNotes}
                       fetchAgainNotes={fetchAgainNotes}
        />

        <NotesAppDialogs setNotes={setNotesPrev}
                         dialogCreateOpen={dialogCreateOpen}
                         setDialogCreateOpen={setDialogCreateOpen}
                         selectedNote={selectedNote}
                         setSelectedNote={setSelectedNoteNull}
                         pingRefresh={pingRefresh}
                         setPingRefresh={setPingRefresh}
                         dialogEditOpen={dialogEditOpen}
                         setDialogEditOpen={setDialogEditOpen}
                         updateNote={updateNote}
        />
      </>
  );
}

export default NotesAppMain;