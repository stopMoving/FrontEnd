import instance from "../lib/axios"; // 설정된 axios 인스턴스를 import

export const userAPI = {
  getUserProfile: async () => {
    try {
      const response = await instance.get(`/users/profile/`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("사용자 정보를 찾을 수 없습니다.");
      }
      throw new Error("프로필 정보를 불러오는 데 실패했습니다.");
    }
  },

  getDonatedBooks: async () => {
    try {
      const response = await instance.get(`/users/donated-books/`);
      if (response.data.isSuccess === true && response.data.meta?.count === 0) {
        return []; // 데이터가 없으면 빈 배열 반환
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("인증이 필요합니다.");
      }
      throw new Error("나눔 내역을 불러오는 데 실패했습니다.");
    }
  },

  getPurchasedBooks: async () => {
    try {
      const response = await instance.get(`/users/purchased-books/`);
      if (response.data.isSuccess === true && response.data.meta?.count === 0) {
        return [];
      }
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error("인증이 필요합니다.");
      }
      throw new Error("구매 내역을 불러오는 데 실패했습니다.");
    }
  },

  uploadProfileImage: async (userId, imageFile) => {
    // FormData 객체를 생성하여 파일을 담습니다.
    const formData = new FormData();
    formData.append("image", imageFile);
    // API 명세의 Request Body에 user_id도 있었지만,
    // 보통 user_id는 URL 경로에 포함시키므로 body에서는 제외합니다.
    // 만약 서버에서 body에 user_id를 요구한다면 formData.append('user_id', userId); 를 추가하세요.

    try {
      // POST 요청 시 Content-Type을 multipart/form-data로 설정해야 합니다.
      const response = await instance.post(
        `/users/upload/${userId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("이미지 업로드 API 오류:", error);
      throw new Error("이미지 업로드에 실패했습니다. 다시 시도해 주세요.");
    }
  },
};

export const bookAPI = {
  getBookByISBN: async (isbn) => {
    try {
      const response = await instance.get(`/bookinfo/donate/?isbn=${isbn}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 400) {
        throw new Error("잘못된 요청입니다. ISBN을 확인해주세요.");
      }
      if (error.response?.status === 202) {
        throw new Error("외부 도서 API 오류입니다. 잠시 후 다시 시도해주세요.");
      }
      throw new Error(
        error.response?.data?.detail || "책 정보 조회에 실패했습니다."
      );
    }
  },

  donateBooks: async (libraryId, donationList) => {
    try {
      const payload = {
        library_id: Number(libraryId),
        books: donationList,
      };
      const response = await instance.post(`/books/donate/`, payload);
      return response.data;
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.detail ===
          "Authentication credentials were not provided."
      ) {
        throw new Error("로그인이 필요합니다.");
      }

      if (error.response?.status === 404) {
        if (error.response?.data?.error === "해당 isbn가 없습니다.") {
          throw new Error("책 정보가 존재하지 않습니다. ISBN을 확인해주세요.");
        }
        if (error.response?.data?.error === "해당 도서관이 없습니다.") {
          throw new Error("해당 도서관 정보를 찾을 수 없습니다.");
        }
      }

      throw new Error("요청 처리에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  },

  searchBooks: async (query) => {
    try {
      const response = await instance.get(`/bookinfo/search/?q=${query}`);
      return response.data;
    } catch (error) {
      throw new Error("검색에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  },

  getBookInfoByISBN: async (isbn, lat, lng) => {
    try {
      let url = `/books/by-isbn/${isbn}/`;
      if (lat != null && lng != null) {
        url += `?lat=${lat}&lng=${lng}`;
      }
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(
          error.response.data.detail || "존재하지 않는 ISBN입니다."
        );
      }
      throw new Error("도서 정보를 불러오는 데 실패했습니다.");
    }
  },

  getPickupBookDetail: async (isbn, libraryId) => {
    try {
      const response = await instance.get(`/books/pickup/detail/`, {
        params: { isbn, library_id: libraryId },
      });
      return response.data;
    } catch (error) {
      throw new Error("해당 책은 재고가 없습니다.");
    }
  },

  pickupBooks: async (libraryId, books) => {
    try {
      const payload = {
        library_id: Number(libraryId),
        books: books,
      };
      const response = await instance.post(`/books/pickup/`, payload);
      return response.data;
    } catch (error) {
      // throw new Error(
      //   error.response?.data?.message || "픽업 처리에 실패했습니다."
      // );
      throw error;
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
