import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    user: {
      userNickname: "",
      userImageUrl: null,
      email: "",
      userPhone: null,
      userInfo: null,
    },
    setUser: (user) => {
      set({ user: user });
    },
  }))
);
// export const useAuthStore = create((set) => ({
//   user: null,
//   countUp: () => set((state) => ({ count: state.count + 1 })),
//   name: "혜진",
//   fetchDate: async () => {
//     const result = await axios("https://jsonplaceholder.typicode.com/posts");
//     return result.data[0];
//   },
// }));
