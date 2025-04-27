import {create} from "zustand";

interface NavMenuStore {
  isNavMenuExpanded: boolean,
  toggleMenuExpanded: () => void,
  isMobileNavOpen: boolean,
  setMobileNavOpen: (enable: boolean) => void,
}

export const useNavMenuStore = create<NavMenuStore>((set, get) => ({
  isNavMenuExpanded: true,
  toggleMenuExpanded: () => set({isNavMenuExpanded: !get().isNavMenuExpanded}),
  isMobileNavOpen: false,
  setMobileNavOpen: (enable: boolean) => set({isMobileNavOpen: enable}),
}))