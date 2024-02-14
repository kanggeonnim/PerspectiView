import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export const useTeamStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        setTeam: (user) => set({ user: user }),
      }),
      {
        name: "team", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used

        partialize: (state) => ({
          user: {
            nickname: state.user.nickname,
            image: state.user.image,
            email: state.user.email,
            personalTeamId: state.user.personalTeamId,
          },
        }),
        onRehydrateStorage: (state) => {
          console.log("hydration starts", state);

          // optional
          return (state, error) => {
            console.log(state, error);
            if (error) {
              console.log("an error happened during hydration", error);
            } else {
              console.log("hydration finished");
            }
          };
        },
      }
    )
  )
);
