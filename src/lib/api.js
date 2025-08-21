import instance from "../lib/axios"; // 설정된 axios 인스턴스를 import

/**
 * 책 관련 API 함수 모음
 */
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
        error.response?.data?.detail || `조회 실패 (${error.response?.status})`
      );
    }
  },

  /**
   * 도서 기증(나눔) 요청
   * @param {number} libraryId - 기증할 도서관 ID
   * @param {string[]} isbnList - 기증할 책들의 ISBN 목록
   * @returns {Promise<object>} - 요청 결과
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
      throw new Error("등록에 실패했어요. 잠시 후 다시 시도해 주세요.");
    }
  },
};

/**
 * ISBN 관련 유틸리티 함수 모음
 */
export const utils = {
  /**
   * ISBN을 하이픈(-)으로 구분된 형식으로 변환합니다.
   * @param {string} isbn - 변환할 ISBN
   * @returns {string} - 변환된 ISBN 문자열
   */
  formatIsbn: (isbn) => {
    return isbn
      ? isbn.replace(/^(\d{3})(\d{2})(\d{4})(\d{3})(\d{1})$/, "$1-$2-$3-$4-$5")
      : "-";
  },

  /**
   * ISBN이 유효한 13자리 형식인지 검사합니다.
   * @param {string} isbn - 검사할 ISBN
   * @returns {boolean} - 유효 여부
   */
  validateISBN: (isbn) => {
    const digits = String(isbn).replace(/[^0-9]/g, "");
    return /^97[89]\d{10}$/.test(digits);
  },

  extractDigits: (text) => {
    return String(text).replace(/[^0-g]/g, "");
  },
};
