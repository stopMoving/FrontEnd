import { create } from "zustand";
import axios from "../lib/axios";

const useLibrarySidebarStore = create((set) => ({
  isOpen: false,

  //내 도서관
  myLibraries: [],
  isMyLibrariesLoading: false,
  myLibrariesError: null,

  //전체 도서관
  allLibraries: [],
  isAllLibrariesLoading: false,
  allLibrariesError: null,

  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  // 내 도서관 연동 API
  fetchMyLibraries: async () => {
    set({ isMyLibrariesLoading: true, myLibrariesError: null });
    try {
      // --- TODO: 나중에 실제 '내 도서관' API 엔드포인트로 교체해주세요 ---
      // const response = await axios.get("/api/my-libraries");
      // set({ myLibraries: response.data, isMyLibrariesLoading: false });

      // 지금은 샘플 데이터를 보여줍니다.
      const sampleMyLibraries = [
        { id: "my1", name: "김영삼도서관 (샘플)" },
        { id: "my2", name: "사당솔밭도서관 (샘플)" },
      ];
      // API 연동 전까지 딜레이를 주어 로딩 상태를 확인하기 위함
      await new Promise((resolve) => setTimeout(resolve, 500));
      set({ myLibraries: sampleMyLibraries, isMyLibrariesLoading: false });
    } catch (err) {
      set({
        myLibrariesError: "'내 도서관' 목록을 불러오지 못했습니다.",
        isMyLibrariesLoading: false,
      });
      console.error("Failed to fetch my libraries:", err);
    }
  },

  fetchAllLibraries: async () => {
    set({ isAllLibrariesLoading: true, allLibrariesError: null });

    try {
      const response = await axios.get("library/list/");

      set({ allLibraries: response.data, isAllLibrariesLoading: false });
    } catch (err) {
      set({
        allLibrariesError: "전체 도서관 목록을 불러오는 데 실패했습니다.", // (O)
        isAllLibrariesLoading: false, // (O)
      });
      console.error("Failed to fetch libraries:", err);
    }
  },
}));

export default useLibrarySidebarStore;
