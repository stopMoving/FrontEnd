import instance from "../lib/axios"; // 설정된 axios 인스턴스를 import

/**
 * 사용자 관련 API 함수 모음
 */
export const userAPI = {
  /**
   * 현재 로그인된 사용자의 프로필 정보를 가져옵니다.
   */
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

  /**
   * 현재 로그인된 사용자의 도서 나눔 내역을 가져옵니다.
   */
  getDonatedBooks: async () => {
    try {
      const response = await instance.get(`/users/donated-books/`);
      if (response.data.isSuccess === true && response.data.meta?.count === 0) {
        return []; // 데이터가 없으면 빈 배열 반환
      }
      return response.data;
    } catch (error) {
      throw new Error("나눔 내역을 불러오는 데 실패했습니다.");
    }
  },
};

/**
 * 책 관련 API 함수 모음
 */
export const bookAPI = {
  /**
   * ISBN으로 알라딘에서 책 정보를 검색합니다. (기증 시 사용)
   */
  getBookByISBNForDonate: async (isbn) => {
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

  /**
   * 도서를 도서관에 기증(나눔)합니다.
   */
  donateBooks: async (libraryId, isbnList) => {
    try {
      const payload = {
        library_id: Number(libraryId),
        isbn: isbnList,
      };
      const response = await instance.post(`/books/donate/`, payload);
      return response.data;
    } catch (error) {
      throw new Error("책 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  },

  /**
   * 일반적인 책 검색
   */
  searchBooks: async (query) => {
    try {
      const response = await instance.get(`/bookinfo/search/?q=${query}`);
      return response.data;
    } catch (error) {
      throw new Error("검색에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  },

  /**
   * ISBN으로 책 상세 정보와 보유 도서관 목록을 조회합니다.
   */
  getBookInfoByISBN: async (isbn, lat, lng) => {
    try {
      let url = `/books/by-isbn/${isbn}/`;
      if (lat && lng) {
        url += `?lat=${lat}&lng=${lng}`;
      }
      const response = await instance.get(url);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error("존재하지 않는 ISBN입니다.");
      }
      throw new Error("도서 정보를 불러오는 데 실패했습니다.");
    }
  },

  /**
   * 데려갈 책의 상세 정보를 조회합니다.
   */
  getPickupBookDetail: async (isbn, libraryId) => {
    try {
      const response = await instance.get(`/books/pickup/detail/`, {
        params: { isbn, library_id: libraryId },
      });
      return response.data;
    } catch (error) {
      throw new Error("데려갈 책 정보를 불러오는 데 실패했습니다.");
    }
  },

  /**
   * 특정 책들을 데려가기(픽업) 요청합니다.
   */
  pickupBooks: async (bookIds) => {
    try {
      const payload = { book_id: bookIds };
      const response = await instance.post(`/books/pickup/`, payload);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "픽업 처리에 실패했습니다."
      );
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
