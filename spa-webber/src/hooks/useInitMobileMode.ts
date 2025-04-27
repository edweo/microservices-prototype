import {useEffect} from "react";
import {useMobileModeStore} from "../stores/MobileModeStore.ts";
import {useNavMenuStore} from "../stores/NavMenuStore.ts";

const MOBILE_PX_THRESHOLD = 768

export function useInitMobileMode() {
  useEffect(() => {
    _setInital()

    const fn = () => {
      const isMobileMode = useMobileModeStore.getState().isMobileMode
      const setMobileNavOpen = useNavMenuStore.getState().setMobileNavOpen

      const sizes = _getWindowSize()
      if (!isMobileMode && sizes.width < MOBILE_PX_THRESHOLD) {
        useMobileModeStore.getState().setMobileMode(true)
      } else if (isMobileMode && sizes.width >= MOBILE_PX_THRESHOLD) {
        useMobileModeStore.getState().setMobileMode(false)
        setMobileNavOpen(false)
      }
    }
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('resize', fn)
    }
  }, []);
}

interface WindowSize {
  width: number,
  height: number
}

function _getWindowSize(): WindowSize {
  const { innerWidth, innerHeight } = window
  return { width: innerWidth, height: innerHeight }
}

function _setInital() {
  const sizes = _getWindowSize()
  let isMobileMode = false
  if (sizes.width < MOBILE_PX_THRESHOLD) isMobileMode = true
  useMobileModeStore.getState().setMobileMode(isMobileMode)
}