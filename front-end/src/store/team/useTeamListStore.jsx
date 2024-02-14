import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTeamListStore = create(
  devtools((set) => ({
    teamList: null,
    setTeamList: (teamList) => set({ teamList: teamList }),
  }))
);
