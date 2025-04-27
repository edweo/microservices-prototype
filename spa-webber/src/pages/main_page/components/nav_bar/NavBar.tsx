import NavItem from "./NavItem.tsx";
import {ReactElement} from "react";
import {AppInfo, appsInfo} from "../../Apps.ts";
import {useNavMenuStore} from "../../../../stores/NavMenuStore.ts";

function NavBar() {
  const setMobileNavOpen = useNavMenuStore(state => state.setMobileNavOpen)

  return(
      <nav className="flex flex-col justify-center items-start">
        {_initNavItem(appsInfo, () => setMobileNavOpen(false))}
      </nav>
  )
}

export default NavBar

function _initNavItem(navItemsInfo: AppInfo[], onClick: () => void): ReactElement[] {
  return navItemsInfo.map((item, index) => {
    return (
        <NavItem id={index}
                 key={index}
                 name={item.name}
                 path={item.path}
                 icon={item.icon}
                 onClick={onClick} />
    )
  })
}
