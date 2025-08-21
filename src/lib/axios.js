import axios from "axios";

const instance = axios.create({
  baseURL: "https://stopmoving.o-r.kr/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use(
//   (config) => {
//     // useUserStore에서 토큰 가져오기
//     const token = getAuthToken();
//     if (token?.access_token) {
//       config.headers.Authorization = `Bearer ${token.access_token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const getAuthToken = () => {
//   // zustand store에서 가져오기
//   return useUserStore.getState().token;
// };

// export const bookAPI = {
//   getBookByISBN: async (isbn) => {
//     const token = getAuthToken();
//     if (!token?.access_token) {
//       throw new Error("로그인이 필요해요.");
//     }

//     try {
//       const response = await instance.get(`/bookinfo/donate/?isbn=${isbn}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       if (error.response?.status === 400) {
//         throw new Error("잘못된 요청입니다. ISBN을 확인해주세요.");
//       }
//       if (error.response?.status === 202) {
//         throw new Error("외부 도서 API 오류입니다. 잠시 후 다시 시도해주세요.");
//       }
//       throw new Error(
//         error.response?.data?.detail || `조회 실패 (${error.response?.status})`
//       );
//     }
//   },

//   donateBooks: async (libraryId, isbnList) => {
//     const token = getAuthToken();
//     if (!token?.access_token) {
//       throw new Error("로그인이 필요해요.");
//     }

//     try {
//       const payload = {
//         library_id: Number(libraryId),
//         isbn: isbnList,
//       };

//       const response = await instance.post(`/books/donate/`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       throw new Error("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
//     }
//   },
// };

// export const utils = {
//   formatIsbn: (isbn) => {
//     return isbn
//       ? isbn.replace(/^(\d{3})(\d{2})(\d{4})(\d{3})(\d{1})$/, "$1-$2-$3-$4-$5")
//       : "-";
//   },

//   validateISBN: (isbn) => {
//     const digits = String(isbn).replace(/[^0-9]/g, "");
//     return /^97[89]\d{10}$/.test(digits);
//   },

//   extractDigits: (text) => {
//     return String(text).replace(/[^0-9]/g, "");
//   },
// };

export default instance;
