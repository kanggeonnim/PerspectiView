import { create } from "zustand";

const charUser = {
  code: "200",
  message: "ok",
  data: {
    charUserList: {
    1: {
        characterId:"1",
        characterName:"MZyeon",
        characterDetail:"do MZ",
        keywordList:[
        3,
        17,
        33
      ]
    },
    2:{
      characterId:"2",
      characterName:"add",
      characterDetail:"add",
      keywordList:[
      4,
      15,
      31
      ]
    },
    3:{
      characterId:"3",
      characterName:"subsub",
      characterDetail:"minus",
      keywordList:[
      4,
      15,
      31
      ]
    },
    }
  }

}


export const useCharStore = create((set) => ({
  chardatas : charUser.data.charUserList,

}))

const useLabelInput = create((set) => ({
  labelInput : "",
  setLabelInput : () => set((state) => ({labelInput: number}) => ())
}))