import {SvgIconComponent} from "@mui/icons-material";
import {SvgIcon} from "@mui/material";

function SvgElementMui(muiIcon: SvgIconComponent) {
  return(
      <>
        <SvgIcon component={muiIcon} inheritViewBox />
      </>
  )
}

export default SvgElementMui