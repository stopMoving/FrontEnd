import { create } from "zustand";
import axios from "axios";
import useUserStore from "./useUserStore"; // 위치 정보를 가져오기 위해 기존 스토어 활용

const useLibrarySidebarStore = create((set, get) => ({
  // --- State ---
  isOpen: false, // 사이드바 열림/닫힘 상태
  myLibraries: [
    { id: "my1", place_name: "김영삼도서관 (샘플)" },
    { id: "my2", place_name: "어쩌고도서관 (샘플)" },
  ], // 내 도서관 목록 (추후 API 연동)
  nearbyLibraries: [], // 주변 도서관 목록
  isLoading: false,
  error: null,

  // --- Actions ---
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  /**
   * 카카오 키워드 검색 API를 사용해 주변 도서관을 가져오는 함수
   */
  fetchNearbyLibraries: async () => {
    set({ isLoading: true, error: null });

    // 1. 사용자 위치 정보 가져오기 (useUserStore 활용)
    const { location } = useUserStore.getState();

    console.log("1. 사용자 위치:", location);

    if (!location) {
      set({
        error: "사용자 위치 정보가 없습니다.",
        isLoading: false,
      });
      return;
    }

    const KAKAO_API_KEY = "9b5dd72fd184bff16291f3455feb76ae"; // 여기에 발급받은 REST API 키를 입력하세요.

    try {
      // 2. 카카오 API 호출
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/keyword.json",
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
          params: {
            query: "도서관",
            x: location.longitude,
            y: location.latitude,
            radius: 2000, // 2km 반경
            sort: "distance", // 거리순 정렬
          },
        }
      );
      console.log("2. API 응답 데이터:", response.data);

      set({ nearbyLibraries: response.data.documents, isLoading: false });
    } catch (err) {
      set({
        error: "주변 도서관 정보를 가져오는 데 실패했습니다.",
        isLoading: false,
      });
      console.error(err);
    }
  },
}));

export default useLibrarySidebarStore;
