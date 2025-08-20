import axios from "axios";
import useUserStore from "../store/useUserStore";

const instance = axios.create({
  baseURL: "https://stopmoving.o-r.kr/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    // useUserStore에서 토큰 가져오기
    const token = getAuthToken();
    if (token?.access_token) {
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response ?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.herf = '/login';
    }
    return Promise.reject(error);
  }
);

const getAuthToken = () => {
  // zustand store에서 가져오기
  return useUserStore.getState().token;
}

export const bookAPI = {
  getBookByISBN: async (isbn) => {
    const token = getAuthToken();
    if (!token?.access_token) {
      throw new Error("로그인이 필요해요.");
    }

    try { 
      const response = await instance.get(`/bookinfo/donate/?isbn=${isbn}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error("잘못된 요청입니다. ISBN을 확인해주세요.");
      }
      if (error.response?.status === 202) {
        throw new Error("외부 도서 API 오류입니다. 잠시 후 다시 시도해주세요.");
      }
      throw new Error(error.response?.data?.detail || `조회 실패 (${error.response?.status})`);
    }
  },

  donateBooks: async (libraryId, isbnList) => {
    const token = getAuthToken();
    if (!token?.access_token) {
      throw new Error("로그인이 필요해요.");
    }

    try {
      const payload = {
        library_id: Number(libraryId),
        isbn: isbnList,
      };

      const response = await instance.post(`/books/donate/`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  },

  searchBooks: async (query) => {
    try {
      const response = await instance.get(`/bookinfo/search/?q=${query}`);
      return response.data;
    } catch (error) {
      throw new Error("검색에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  },

  getBookInfoByISBN: async(isbn, lat, lng) => {
    try {
      let url = `/books/by-isbn/${isbn}/`;
      //위도와 경도 파라미터가 있으면 URL에 추가
      if (lat && lng) {
        url += `?lat=${lat}&lng=${lng}`;
      }
      const resposne = await instance.get(url);
      return resposne.data;
    } catch (error) {
      if (error.message?.status === 404) {
        throw new Error("존재하지 않는 ISBN입니다.");
      }
      throw new Error("도서 정보를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  },
};

export const utils = {
  formatIsbn: (isbn) => {
    return isbn
      ? isbn.replace(/^(\d{3})(\d{2})(\d{4})(\d{3})(\d{1})$/, "$1-$2-$3-$4-$5")
      : "-";
  },

  validateISBN: (isbn) => {
    const digits = String(isbn).replace(/[^0-9]/g, "");
    return /^97[89]\d{10}$/.test(digits);
  },

  extractDigits: (text) => {
    return String(text).replace(/[^0-9]/g, "");
  },
};

export const userAPI = {
  getUserProfile: async () => {
    try {
      const response = await instance.get(`/users/profile/`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("사용자 정보를 찾을 수 있습니다.");
      }
      if (error.response?.status === 401) {
        throw new Error("인증이 필요합니다.");
      }
      throw new Error("프로필 정보를 불러오는 데 실패했습니다.");
    }
  },

  getDonatedBooks: async () => {
    try {
      const response = await instance.get(`/users/donated-books/`);

      if (response.data.isSuccess === true && response.data.meta?.count === 0) {
        return [];
      }
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("인증이 필요합니다.");
      }
      throw new Error("나눔 내역을 불러오는 데 실패했습니다.");
    }
  },
};
// instance.interceptors.response.use(res => res, async (error) => {
//   const originalRequest = error.config;
//   if (error.response?.status === 401 && !originalRequest._retry) {
//     await instance.post('/auth/token/refresh', undefined, { _retry: true });
//     originalRequest._retry = true;
//     return instance(originalRequest);
//   }
//   return Promise.reject(error);
// });

export default instance;