import {NoteInfo} from "../NotesApp.tsx";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import {validateNote} from "../utils/NoteValidation.ts";
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  selectedNote: NoteInfo,
  navigateBack: () => void,
  deleteNote: (note: NoteInfo) => void,
  updateNote: (note: NoteInfo) => Promise<boolean>,
}

export default function ViewNote({selectedNote, navigateBack, deleteNote, updateNote}: Props) {
  const [editMode, setEditMode] = useState(false)
  const [editedNote, setEditedNote] = useState<NoteInfo>({...selectedNote})

  return (
      <>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex justify-between items-center md:flex-row w-full">
            <div className="flex justify-start items-center gap-1 w-full mr-2">
              <ArrowBackIcon onClick={navigateBack} className="text-onSecondary cursor-pointer p-1 rounded-full" fontSize={'large'} />
              {editMode &&
                  <div className="flex justify-between w-full">
                      <input type="text" value={editedNote.title}
                             className="flex w-full md:w-80 bg-secondary text-onSecondary px-2 bold text-3xl border-third border-2 rounded focus:outline-none"
                             onChange={(e) => {
                               e.stopPropagation()
                               e.preventDefault()
                               setEditedNote((prevState) => {
                                 return {...prevState, title: e.target.value}
                               })
                             }}
                      />
                  </div>
              }
              {!editMode &&
                  <h1 className="text-3xl bold text-onPrimary border-2 border-secondary select-none ml-2">{selectedNote.title}</h1>
              }
            </div>
            <div className="flex gap-2">
              {!editMode &&
                  <>
                      <div className="flex p-1 justify-center items-center cursor-pointer text-onThird bg-third rounded-full"
                           onClick={(e) => {
                             e.stopPropagation()
                             e.preventDefault()
                             setEditMode(true)
                           }}>
                          <EditIcon/>
                      </div>
                      <div className="flex p-1 justify-center items-center cursor-pointer text-onThird bg-third rounded-full"
                           onClick={(e) => {
                             e.stopPropagation()
                             e.preventDefault()
                             deleteNote(selectedNote)
                             navigateBack()
                           }}>
                          <DeleteIcon/>
                      </div>
                  </>
              }
              {editMode &&
                  <>
                      <div className="flex p-1 justify-center items-center cursor-pointer text-onThird bg-third rounded-full"
                           onClick={(e) => {
                             e.stopPropagation()
                             e.preventDefault()
                             setEditedNote({...selectedNote})
                             setEditMode(false)
                           }}>
                          <CloseIcon/>
                      </div>
                      <div className="flex p-1 justify-center items-center cursor-pointer text-onThird bg-third rounded-full"
                           onClick={async (e) => {
                             e.stopPropagation()
                             e.preventDefault()
                             if (!validateNote(editedNote)) return
                             if (await updateNote(editedNote)) {
                               setEditMode(false)
                             }
                           }}>
                          <SaveIcon/>
                      </div>
                  </>
              }
            </div>
          </div>
        </div>

        <div className="w-full bg-onSecondary h-0.5 mt-4"></div>

        {editMode &&
            <textarea
                className="h-full flex p-4 mt-4 rounded bg-secondary text-onSecondary focus:outline-none border-third border-2"
                value={editedNote.description}
                onChange={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setEditedNote((prevState) => {
                    return {...prevState, description: e.target.value}
                  })
                }}
            />
        }

        {!editMode &&
          <div className="flex bg-secondary rounded h-full p-4 mt-4 border-2 border-secondary">
            <p className="whitespace-pre-wrap text-onSecondary">{selectedNote.description}</p>
          </div>
        }
      </>
  )
}
