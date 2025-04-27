import {useNavMenuStore} from "../../../../stores/NavMenuStore.ts";
import {NavLink} from "react-router";
import {ReactElement} from "react";
import {useMobileModeStore} from "../../../../stores/MobileModeStore.ts";

interface Props {
  id?: number,
  name: string,
  path: string,
  icon: () => ReactElement,
  onClick: () => void,
}

function NavItem({ name, path, icon, onClick}: Props) {
  const expanded = useNavMenuStore(state => state.isNavMenuExpanded)
  const isMobileMode = useMobileModeStore(state => state.isMobileMode)

  return(
      <NavLink to={path}
               className="flex items-center justify-start gap-2 rounded cursor-pointer w-full text-primary hover:bg-third"
               onClick={() => onClick()}>
        <div className="flex items-center justify-center rounded w-10 h-10 p-2 select-none fill-onPrimary text-onPrimary">
          {icon()}
        </div>

        {(isMobileMode || expanded) && <h1 className="text-l pr-2 select-none text-onPrimary">{name}</h1>}
      </NavLink>
  )
}

export default NavItem