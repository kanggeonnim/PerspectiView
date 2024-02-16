import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user: user }),
      }),
      {
        name: "userInfo",
        storage: createJSONStorage(() => sessionStorage),

        onRehydrateStorage: (state) => {
          console.log("login starts", state);

          return (state, error) => {
            console.log(state, error);
            if (error) {
              console.log("an error happened during login", error);
            } else {
              console.log("login finished");
            }
          };
        },
      }
    )
  )
);
