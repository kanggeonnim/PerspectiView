import axios from "axios";
import { privateApi } from "@/util/api";
import { useMutation } from "react-query";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const useProductAddQueryModule = (teamId) => {
  const posting = async () => {
    const url = `/api/team/${teamId}/product`;
    const payload = {
      productTitle: "create Test",
      productInfo: "string!",
      category: {
        id: 1,
        name: "웹소설",
      },
      genres: [
        {
          id: 2,
          name: "액션",
        },
      ],
      uploadImage: "string",
    };
    axios
      .post(url, payload)
      .then((el) => console.log(el.data))
      .catch((err) => console.log(err));
  };

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(posting);

  console.log(
    `isLoading: ${isLoading}, isError: ${isError}, error: ${error}, isSuccess: ${isSuccess}`
  );

  return <button onClick={mutate}>데이터 POST</button>;
};

// post 예문
// import axios from 'axios';
// import { privateApi } from '@/util/api';
// import { useMutation } from "react-query";
// const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

// const PostData = () => {

// 	const posting = async () => {
//           const url = `/posting`;
//           const payload = { data };
//           axios.post(url, payload)
//                   .then(el => console.log(el.data))
//                   .catch(err => console.log(err));
// 	}

//     const { mutate, isLoading, isError, error, isSuccess } = useMutation(posting);

//     console.log(`isLoading: ${isLoading}, isError: ${isError}, error: ${error}, isSuccess: ${isSuccess}`);

// 	return(<button onClick={mutate}>데이터 POST</button>);

// }
