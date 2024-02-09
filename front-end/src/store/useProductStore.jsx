import { create} from 'zustand';
import { devtools } from "zustand/middleware";

const useProductStore = create(devtools((set) => ({
  totalItems: 0,
  totalPages: 1,
  productInfo: [],
  setProductData: (productData, itemsPerPage) => {
    const totalItems = productData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    set({ totalItems, totalPages, productInfo: productData });
  },
  
  inputs: {
    productTitle: "empty",
    productInfo: "1",
    url: ""
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
  setInputs: (newInputs) => set((state) => ({ inputs: newInputs })),
  setProducts: (newProducts) => set((state) => ({ products: newProducts })),
  setSelectedIdx: (newIdx) => set((state) => ({ selectedIdx: newIdx })),
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
        inputs: { productTitle: "empty", productInfo: "", url: "" }
      };
    });
  }

})));

export default useProductStore;