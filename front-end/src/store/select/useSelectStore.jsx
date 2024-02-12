import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSelectStore = create(
    devtools((set) => ({
        categories: [],
        genres: "",
        setCategories: (categories) => {
            set({categories : categories})
        },
        setGenres: (genres) => {
            set({genres:genres})
        }

    }))
)