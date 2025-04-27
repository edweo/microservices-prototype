import {useNavMenuStore} from "../../../../stores/NavMenuStore.ts";

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

export default function ExpandNavButton() {
  const toggleMenuExpand = useNavMenuStore(state => state.toggleMenuExpanded)
  const isMenuExpanded = useNavMenuStore(state => state.isNavMenuExpanded)

  return (
      <div className="hover:bg-third/30 p-0.5 rounded cursor-pointer" onClick={toggleMenuExpand}>
        <div className={`flex justify-center items-center text-onPrimary`}>
          {!isMenuExpanded
              ? <KeyboardDoubleArrowRightIcon className="text-color-primary" fontSize="small"/>
              : <KeyboardDoubleArrowLeftIcon className="text-color-primary" fontSize="small"/>}
        </div>
      </div>
  )
}