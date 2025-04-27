import {isDarkModeLocalStorage, setDarkModeDOM} from "../functions/darkMode.ts";
import {useDarkModeStore} from "../stores/DarkModeStore.ts";
import {useEffect} from "react";

export function useInitDarkMode() {
  useEffect(() => {
    const isDarkMode = isDarkModeLocalStorage()
    let mode: boolean = false

    if (isDarkMode === null) {
      // Get OS dark mode setting
      mode = window.matchMedia("(prefers-color-scheme: dark)").matches
    } else {
      mode = isDarkMode
    }

    useDarkModeStore.subscribe(state => {
      setDarkModeDOM(state.isDarkMode)
    })

    useDarkModeStore.getState().setDarkMode(mode)
  }, [])
 }

