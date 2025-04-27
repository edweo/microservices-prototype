import {useEffect, useState} from "react";
import NotesAppMain from "./pages/NotesAppMain.tsx";
import AppWrapper from "../../AppWrapper.tsx";
import ViewNote from "./pages/ViewNote.tsx";
import {NotesAppPages} from "./NotesAppPages.ts";
import {validateNote} from "./utils/NoteValidation.ts";
import getNotes from "./http/get_notes.ts";
import deleteNote from "./http/delete_note.ts";
import updateNote from "./http/update_note.ts";

export interface NoteInfo {
  id: string,
  title: string,
  description: string,
}

export default function NotesApp() {
  const [notes, setNotes] = useState<NoteInfo[]>([])
  const [pingRefresh, setPingRefresh] = useState(false)
  const [selectedNote, setSelectedNote] = useState<NoteInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(NotesAppPages.HOME)
  const [fetchedNotes, setFetchedNotes] = useState(false)
  const [isLoadingNotes, setIsLoadingNotes] = useState(true)

  useEffect(() => {
    fetchAllNotes()
  }, []);

  function fetchAllNotes() {
    setIsLoadingNotes(true)
    getNotes()
        .then(notes => {
          setNotes(notes)
          setFetchedNotes(true)
          setIsLoadingNotes(false)
        })
        .catch(e => {
          console.log("Error: ", e.message)
          setFetchedNotes(false)
          setIsLoadingNotes(false)
        })
  }

  async function _deleteNote(note: NoteInfo) {
    try {
      const deleted = await deleteNote(note)
      if (deleted){
        const newNotes = notes.filter(n => {
          if (n !== note) return note
        })
        setNotes(newNotes)
      } else {
        // TODO if note not deleted
      }
    } catch (e) {
      // TODO if note not deleted
    }
  }

  async function _updateNote(note: NoteInfo): Promise<boolean> {
    if (selectedNote === null ) return false
    if (!validateNote(note)) return false

    try {
      const updated = await updateNote(note)
      if (updated) {
        selectedNote.title = note.title
        selectedNote.description = note.description
        setPingRefresh(!pingRefresh)
        return true
      }
      return false
    } catch (e) {
      // TODO handle
    }
    return false
  }

  function renderPage() {
    switch (currentPage) {
      case NotesAppPages.HOME:
        return <NotesAppMain
            notes={notes}
            pingRefresh={pingRefresh}
            setNotes={setNotes}
            setNotesPrev={setNotes}
            setSelectedNote={setSelectedNote}
            setSelectedNoteNull={setSelectedNote}
            selectedNote={selectedNote}
            setPingRefresh={setPingRefresh}
            setCurrentPage={setCurrentPage}
            deleteNote={_deleteNote}
            updateNote={_updateNote}
            fetchedNotes={fetchedNotes}
            isLoadingNotes={isLoadingNotes}
            fetchAgainNotes={fetchAllNotes}
        />
      case NotesAppPages.NOTE_VIEW:
        return <ViewNote
            selectedNote={selectedNote!}
            navigateBack={() => setCurrentPage(NotesAppPages.HOME)}
            deleteNote={_deleteNote}
            updateNote={_updateNote}
        />
    }
  }

  return (
      <AppWrapper>
        {/*
        Not the best solution.
        Should have used global state and routing with child routes to avoid extensive prop passing.
        Will consider in the future projects.
        */}
        {renderPage()}
      </AppWrapper>
  )
}
