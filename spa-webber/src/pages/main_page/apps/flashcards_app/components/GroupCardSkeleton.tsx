import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import {SvgIcon} from "@mui/material";

function GroupCard() {
  return (
      <div className="bg-colorOther/50 animate-pulse rounded w-full h-36 p-2 flex">
        <div className="flex flex-col h-full w-full justify-center items-center relative gap-2">
          <div className="bg-colorOther/70 animate-pulse flex flex-1 w-full"></div>
          <div className="bg-colorOther/70 flex h-6 w-1/5 self-end rounded"></div>
        </div>
      </div>
  );
}

export default GroupCard;