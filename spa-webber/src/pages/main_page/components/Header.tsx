import Menu from "./Menu.tsx";
import MenuIcon from '@mui/icons-material/Menu';
import {useMobileModeStore} from "../../../stores/MobileModeStore.ts";
import {IconButton, SwipeableDrawer} from '@mui/material';
import {useNavMenuStore} from "../../../stores/NavMenuStore.ts";

export default function Header() {
  // Mobile Mode Store
  const isMobileMode = useMobileModeStore(state => state.isMobileMode)

  // Nav Menu Store
  const isMobileNavOpen = useNavMenuStore(state => state.isMobileNavOpen)
  const setMobileNavOpen = useNavMenuStore(state => state.setMobileNavOpen)

  return(
      <>
        <div className="fixed z-10 w-full sm:static md:w-fit bg-primary p-2 drop-shadow-lg">
          <div className="w-full flex justify-between items-center">
            {isMobileMode && <h1 className="text-color-primary ml-2">Webber</h1>}
            {isMobileMode &&
                <IconButton onClick={() => setMobileNavOpen(true)}>
                    <MenuIcon className="text-onPrimary" />
                </IconButton>
            }
          </div>
          {!isMobileMode && <Menu/>}
        </div>

        <SwipeableDrawer anchor={'left'}
                         open={isMobileNavOpen}
                         onClose={() => setMobileNavOpen(false)}
                         onOpen={() => setMobileNavOpen(true)}
        >
          <div className="flex flex-1 p-2 bg-primary">
            <Menu />
          </div>
        </SwipeableDrawer>
      </>
  )
}
