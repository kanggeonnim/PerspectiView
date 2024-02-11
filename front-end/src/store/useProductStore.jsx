import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useProductStore = create(
  devtools((set) => ({
    product: null,
    setProduct: (product) => {
      set({ product: product });
    },
  }))
);
