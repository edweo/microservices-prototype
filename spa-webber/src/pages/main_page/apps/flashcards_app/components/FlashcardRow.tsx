import FlashcardData from "../models/FlashcardData.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {SvgIcon} from "@mui/material";

interface Props {
  flashcard: FlashcardData,
  onClick: () => void,
  onClickDelete: () => void,
}

function FlashcardRow({flashcard, onClick, onClickDelete}: Props) {
  return (
      <div
          className="bg-colorOther hover:bg-colorOther/80 w-full flex justify-between items-start rounded p-3 cursor-pointer gap-2"
          onClick={onClick}
      >
        <div className="flex flex-col sm:flex-row gap-1">
          <h1 className="text-primary h-6 sm:h-full sm:min-w-36 text-l sm:flex-1 font-bold inline-block overflow-hidden sm:overflow-ellipsis sm:whitespace-nowrap"
          >
            {flashcard.prompt}
          </h1>
          <h2 className="text-onSecondary h-6 overflow-hidden sm:flex-[3] text-sm inline-block text-start"
          >
            {flashcard.answer}
          </h2>
        </div>
        <div className="flex gap-1 justify-center items-center z-10">
          {/*<SvgIcon component={EditIcon} className="text-primary hover:bg-secondary rounded p-0.5" />*/}
          <SvgIcon component={DeleteIcon}
                   className="text-primary bg-secondary hover:bg-secondary/70 rounded p-0.5"
                   onClick={(e) => {
                     e.stopPropagation()
                     e.preventDefault()
                     onClickDelete()
                   }}
          />
        </div>
      </div>
  );
}

export default FlashcardRow;