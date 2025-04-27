import {create} from "zustand";

interface MobileModeStore {
  isMobileMode: boolean,
  setMobileMode: (enable: boolean) => void,
}

export const useMobileModeStore = create<MobileModeStore>((set) => ({
  isMobileMode: false,
  setMobileMode: (enable) => set({isMobileMode: enable})
}))