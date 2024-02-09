import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    user: null,
    setUser: (user) => {
      set({ user: user });
    },
  }))
);
