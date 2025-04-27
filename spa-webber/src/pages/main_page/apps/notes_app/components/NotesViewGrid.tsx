import {ReactElement} from "react";
import NoteCard from "./NoteCard.tsx";
import {NoteInfo} from "../NotesApp.tsx";
import {NotesAppPages} from "../NotesAppPages.ts";
import WebberButton from "../../../../../components/WebberButton.tsx";
import NoteSkeleton from "./NoteSkeleton.tsx";

interface Props {
  notes: NoteInfo[],
  searchResult: NoteInfo[] | null,
  setSelectedNote: (note: NoteInfo) => void,
  setDialogEditOpen: (open: boolean) => void,
  setCurrentPage: (page: NotesAppPages) => void,
  deleteNote: (note: NoteInfo) => void,
  fetchedNotes: boolean,
  isLoadingNotes: boolean,
  fetchAgainNotes: () => void,
}

export default function NotesViewGrid({notes, searchResult, setSelectedNote, setDialogEditOpen, setCurrentPage, deleteNote, fetchedNotes, isLoadingNotes, fetchAgainNotes}: Props) {

  function editNote(note: NoteInfo) {
    setSelectedNote(note)
    setDialogEditOpen(true)
  }

  function viewNote(note: NoteInfo) {
    setSelectedNote(note)
    setCurrentPage(NotesAppPages.NOTE_VIEW)
  }

  let page: ReactElement
  if (fetchedNotes || isLoadingNotes) {
    page =
    <>
      {(isLoadingNotes || (notes.length > 0 && fetchedNotes)) &&
          <div className="overflow-scroll mt-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
                {(fetchedNotes && !isLoadingNotes) &&
                  <>
                    {(searchResult === null) && _renderNotes(notes, deleteNote, editNote, viewNote)}
                    {(searchResult !== null) && _renderNotes(searchResult, deleteNote, editNote, viewNote)}
                  </>
                }

                {(isLoadingNotes) && _renderNoteSkeletons(9)}
              </div>
          </div>
      }

      {(fetchedNotes && notes.length === 0) &&
          <div className="flex flex-1 text-onSecondary justify-center items-center">No notes created</div>
      }
    </>
  } else {
    page =
    <div className="flex flex-1 justify-center items-center flex-col gap-2">
      <h1>Error fetching notes</h1>
      <WebberButton text={"Try again"} onClick={fetchAgainNotes} />
    </div>
  }

  return page
}

function _renderNoteSkeletons(amount: number): ReactElement[] {
  const list: ReactElement[] = []
  for (let i = 0; i < amount; i++) {
    list[i] = <NoteSkeleton key={i} />
  }
  return list
}

function _renderNotes(notes: NoteInfo[],
                      deleteNote: (note: NoteInfo) => void,
                      editNote: (note: NoteInfo) => void,
                      viewNote: (note: NoteInfo) => void,
): ReactElement[] {
  return notes.map((n, index) => {
    return <NoteCard key={index}
                     title={n.title}
                     description={n.description}
                     onDelete={(e) => {
                       e.stopPropagation()
                       e.preventDefault()
                       deleteNote(n)
                     }}
                     onEdit={(e) => {
                       e.stopPropagation()
                       e.preventDefault()
                       editNote(n)
                     }}
                     onViewNote={(e) => {
                       e.stopPropagation()
                       e.preventDefault()
                       viewNote(n)
                     }}
    />
  })
}
