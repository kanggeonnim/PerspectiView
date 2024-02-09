import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    user: {
      userNickname: "google_100945562307024095454",
      userImageUrl: "",
      email: "sjytis14@gmail.com",
      userPhone: null,
      userInfo: null,
    },
    setUser: (user) => {
      set({ user: user });
    },
  }))
);
