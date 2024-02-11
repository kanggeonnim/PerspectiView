import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useCharStore = create(devtools((set) => ({
  inputs: {
    name: "",
    description: "",
    url: "",
    pX: "",
    pY: ""

  },
  users: [
    // {
    //   id: 1,
    //   name: "도지",
    //   tag: ["doge", "currency", "meme"],
    //   url: "https://img6.yna.co.kr/etc/inner/KR/2021/06/12/AKR20210612027700009_02_i_P4.jpg",
    //   description: "왈왈"
    // },
    // {
    //   id: 2,
    //   name: "루피",
    //   tag: ["pirates"],
    //   url: "https://i.namu.wiki/i/OWM_7jcIjGzJlUDSYk-1UsTuDu6T7pAvRog0yhCOzG-3Qmve_FnvLeHB59-y15OmIfF09dgrDsOZPQfPIT5zhqVE9xB4RxVzx5al1u0MIjIRz0tpK93I9lzxBEHTCVAkC51wyQIV6DR3tW3AlwQ4qw.webp",
    //   description: "해적",
    // },
    // {
    //   id: 3,
    //   name: "?",
    //   tag: ["? ? ?"],
    //   url: "https://opgg-com-image.akamaized.net/attach/images/20200819103406.1358592.jpg",
    //   description: "? ?",
    // }
  ],
  selectedIdx: '',
  setInputs: (newInputs) => set((state) => ({ inputs: newInputs })),
  setUsers: (newUsers) => set((state) => ({ users: newUsers })),
  setSelectedIdx: (newIdx) => set((state) => ({ selectedIdx: newIdx })),
  onCreate: () => {
    set((state) => {
      const user = {
        id: state.users.length + 1,
        tag: [],
        name: state.inputs.name,
        description: state.inputs.description,
        url: state.inputs.url,
        pX: state.inputs.pX,
        pY: state.inputs.pY,
      };
      return {
        users: [...state.users, user],
        inputs: { name: "", description: "", url: "", pX: "", pY: "" }
      };
    });
  }
})));

export default useCharStore;