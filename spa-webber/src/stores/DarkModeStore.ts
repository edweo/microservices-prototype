import {create} from "zustand";

interface DarkModeStore {
  isDarkMode: boolean,
  toggleDarkMode: () => void,
  setDarkMode: (enabled: boolean) => void
}

export const useDarkModeStore = create<DarkModeStore>((set, get) => ({
  isDarkMode: false,
  toggleDarkMode: () => set({isDarkMode: !get().isDarkMode}),
  setDarkMode: (enabled: boolean) => {
    set({isDarkMode: enabled})
  },
}))

