import {create} from 'zustand';

const useProductStore = create((set) => ({
  totalItems: 0,
  totalPages: 1,
  productInfo: [],
  setProductData: (productData, itemsPerPage) => {
    const totalItems = productData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    set({ totalItems, totalPages, productInfo: productData });
  },
}));

export default useProductStore;