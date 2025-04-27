import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from "react";

interface Props {
  title: string,
  description: string,
  onDelete: (e: React.MouseEvent<HTMLElement>) => void,
  onEdit: (e: React.MouseEvent<HTMLElement>) => void,
  onViewNote: (e: React.MouseEvent<HTMLElement>) => void,
}

export default function NoteCard({title, description, onDelete, onEdit, onViewNote}: Props) {
  return(
      <div
          // className="flex flex-col h-[295px] cursor-pointer w-full bg-secondary p-4 border-2 border-third rounded drop-shadow-md"
          className="bg-gradient-to-tr from-colorOther2 to-colorOther flex flex-col h-[295px] cursor-pointer w-full p-4 rounded drop-shadow-md"
          onClick={(e) => onViewNote(e)}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl text-onSecondary bold">{title}</h1>
          <div className="flex gap-1 justify-center items-center text-onPrimary">
            <div className="rounded cursor-pointer text-onPrimary hover:bg-third" onClick={(e) => onEdit(e)}>
              <EditIcon/>
            </div>
            <div className="rounded cursor-pointer text-onPrimary hover:bg-third" onClick={(e) => onDelete(e)}>
              <DeleteIcon/>
            </div>
          </div>
        </div>

        <div className="w-full bg-onSecondary h-0.5 mt-2"></div>

        {/*<div className="bg-secondary rounded h-full mt-2 overflow-hidden">*/}
        <div className="rounded h-full mt-2 overflow-hidden">
          <h2 className="whitespace-pre-wrap text-onSecondary">{description}</h2>
        </div>
      </div>
  )
}