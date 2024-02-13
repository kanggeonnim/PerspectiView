import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCharStore = create(devtools((set) => ({
  inputs: {
    characterName: "",
    characterDetail: "",
    characterPositionX: "",
    characterPositionY: ""

  },
  users: [
  ],
  selectedIdx: '',
  setInputs: (newInputs) => set((state) => ({ inputs: newInputs })),
  setUsers: (newUsers) => set((state) => ({ users: newUsers })),
  setSelectedIdx: (newIdx) => set((state) => ({ selectedIdx: newIdx })),
  onCreate: () => {
    set((state) => {
      const user = {
        id: state.users.length + 1,
        name: state.inputs.name,
        description: state.inputs.description,
        url: state.inputs.url,
        characterPositionX: state.inputs.characterPositionX,
        characterPositionY: state.inputs.characterPositionY,
      };
      return {
        users: [...state.users, user],
        inputs: { name: "", description: "", url: "", characterPositionX: "", characterPositionY: "" }
      };
    });
  }
})));

export default useCharStore;