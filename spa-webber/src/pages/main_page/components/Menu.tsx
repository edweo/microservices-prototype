import NavBar from "./nav_bar/NavBar.tsx";
import {useMobileModeStore} from "../../../stores/MobileModeStore.ts";
import ExpandNavButton from "./nav_bar/ExpandNavButton.tsx";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NavItem from "./nav_bar/NavItem.tsx";
import {RoutePaths} from "../RoutePaths.ts";
import {useNavMenuStore} from "../../../stores/NavMenuStore.ts";

export default function Menu() {
  const isMobileMode = useMobileModeStore(state => state.isMobileMode)
  const isMenuExpanded = useNavMenuStore(state => state.isNavMenuExpanded)
  const setMobileNavOpen = useNavMenuStore(state => state.setMobileNavOpen)

  return(
      <div className="w-fit flex flex-col h-full justify-between">
        <NavBar />

        <div className="flex flex-col">
          <NavItem name="Profile"
                   path={RoutePaths.PROFILE}
                   icon={() => <PersonIcon/>}
                   onClick={() => setMobileNavOpen(false)}
          />

          <NavItem name="Settings"
                   path={RoutePaths.SETTINGS}
                   icon={() => <SettingsIcon/>}
                   onClick={() => setMobileNavOpen(false)}
          />

          {!isMobileMode && <div className="w-full bg-onSecondary my-3 h-[1px]"></div>}

          <div className={`flex items-center ${isMenuExpanded ? "justify-end" : "justify-center"}`}>
            {!isMobileMode && <ExpandNavButton/>}
          </div>
        </div>
      </div>
  )
}