import { create} from 'zustand';
import { devtools } from "zustand/middleware";

const useProductAddStore = create(devtools((set) => ({
  inputs: {
    name: "",
    description: "",
    categories: "",
    genres: "",
    url: ""
  },
  products: [
    {
      id: 1,
      name: "작품",
      url: "https://img6.yna.co.kr/etc/inner/KR/2021/06/12/AKR20210612027700009_02_i_P4.jpg",
      description: "작품입니다.",
    },
    
  ],
  setInputs: (newInputs) => set((state) => ({ inputs: newInputs })),
  setProducts: (newProd) => set((state) => ({ products: newProd })),
  onCreate: () => {
    set((state) => {
      const product = {
        id: state.products.length + 1,
        name: state.inputs.name,
        description: state.inputs.description,
        url: state.inputs.url
      };
      return {
        products: [...state.products, product],
        inputs: { name: "", description : "", url: "" }
      };
    });
  }

})));

export default useProductAddStore;