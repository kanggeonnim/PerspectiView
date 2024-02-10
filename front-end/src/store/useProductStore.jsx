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

// {
//     "productId": 1,
//     "productTitle": "testing",
//     "productInfo": "for test",
//     "productImageUrl": "ssss",
//     "category": {
//         "id": 1,
//         "name": "웹소설"
//     },
//     "genres": [],
//     "plots": [
//         {
//             "plotId": 6,
//             "plotName": "플롯3",
//             "plotColor": "#ffe83f",
//             "stories": [
//                 {
//                     "storyId": 4,
//                     "storyTitle": "스토리1",
//                     "characters": [],
//                     "positionX": 0,
//                     "positionY": 0
//                 }
//             ]
//         },
//         {
//             "plotId": 7,
//             "plotName": "중막?",
//             "plotColor": "#CD5C5C",
//             "stories": []
//         },
//         {
//             "plotId": 8,
//             "plotName": "플롯4",
//             "plotColor": "#ff75c3",
//             "stories": []
//         },
//         {
//             "plotId": 11,
//             "plotName": "플롯1321323",
//             "plotColor": "#ff75c3",
//             "stories": []
//         },
//         {
//             "plotId": 15,
//             "plotName": "플롯?!?~",
//             "plotColor": "#ff75c3",
//             "stories": []
//         },
//         {
//             "plotId": 18,
//             "plotName": "sdfdsf",
//             "plotColor": "#09203f",
//             "stories": []
//         },
//         {
//             "plotId": 22,
//             "plotName": "123213",
//             "plotColor": "#cd93ff",
//             "stories": []
//         },
//         {
//             "plotId": 29,
//             "plotName": "sdfdsdfsf",
//             "plotColor": "#cd93ff",
//             "stories": []
//         },
//         {
//             "plotId": 30,
//             "plotName": "플롯~~~~~~",
//             "plotColor": "#ff75c3",
//             "stories": []
//         }
//     ]
// }
