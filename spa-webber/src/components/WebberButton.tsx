import {Button} from "@mui/base";
import {ReactElement} from "react";

interface Props {
  text: string,
  icon?: () => ReactElement,
  onClick: () => void,
  styleContainer?: string,
  styleText?: string,
  disabled?: boolean,
}

export default function WebberButton({text, icon, onClick, styleContainer, styleText, disabled=false}: Props) {
  return(
      <Button onClick={onClick}
              disabled={disabled ?? false}
              slotProps={{
                root: () => ({
                  className: `rounded px-2 gap-1 py-1 flex bg-primary justify-center items-center ${styleContainer} ${disabled === true ? "bg-primary/50" : "bg-primary"}`
                })
              }}
      >
        <h2 className={styleText}>{text}</h2>
        {(icon !== undefined) && icon()}
      </Button>
  )
}