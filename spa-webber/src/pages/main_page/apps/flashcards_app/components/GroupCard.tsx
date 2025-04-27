import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import {SvgIcon} from "@mui/material";

interface Props {
  name: string,
  count: number,
  onClick: () => void
}

function GroupCard({name, count, onClick}: Props) {
  return (
      // <div className="bg-colorOther hover:bg-colorOther/80 rounded w-full h-36 p-2 flex cursor-pointer"
      <div className="bg-gradient-to-tr from-colorOther2 to-colorOther hover:from-primary hover:to-colorOther
       rounded w-full h-36 p-2 flex cursor-pointer transition ease-in-out duration-400"
           onClick={onClick}
      >
        <div className="flex flex-1 justify-center items-center relative">
          <h1 className="text-2xl text-center">{name}</h1>
          <div className="absolute z-10 bottom-0 right-0 flex gap-1 bg-colorOther2 rounded px-2">
            <h1 className="text-onSecondary">{count}</h1>
            <SvgIcon component={CropLandscapeIcon} className="text-onSecondary" />
          </div>
        </div>
      </div>
  );
}

export default GroupCard;