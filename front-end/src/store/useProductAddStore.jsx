import { create} from 'zustand';
import { devtools } from "zustand/middleware";

const useProductAddStore = create(devtools((set) => ({
  inputs: {
    productTitle: "empty",
    productInfo: "1",
    url: "",
  },
  products: [
    {
      id: 1,
      productTitle: "작품",
      productInfo: "작품입니다.",
      url: "https://img6.yna.co.kr/etc/inner/KR/2021/06/12/AKR20210612027700009_02_i_P4.jpg"
    },
    
  ],
  selectedIdx: '',
  setInputs: (inp) => set((state) => ({ inputs: inp })),
  setProducts: (newProd) => set((state) => ({ products: newProd })),
  setSelectedIdx: (newIndex) => set((state) => ({ selectedIdx: newIndex })),
  onCreate: () => {
    set((state) => {
      const product = {
        id: state.products.length + 1,
        tag: [],
        productTitle: state.inputs.productTitle,
        productInfo: state.inputs.productInfo,
        url: state.inputs.url
      };
      return {
        products: [...state.products, product],
        inputs: { productTitle: "", productInfo: "", url: "" }
      };
    });
  }

})));

export default useProductAddStore;