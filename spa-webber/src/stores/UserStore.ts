import {create} from "zustand";

interface UserStore {
  user: string | null,
  setUser: (newUser: string | null) => void,
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: string | null) => set({user: user}),
}))