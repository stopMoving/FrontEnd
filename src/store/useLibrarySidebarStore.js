import { create } from "zustand";
import axios from "../lib/axios";
import useUserStore from "./useUserStore";

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

  // 내 도서관 API
  fetchMyLibraries: async () => {
    set({ isMyLibrariesLoading: true, myLibrariesError: null });

    const { token } = useUserStore.getState();

    if (!token || !token.access_token) {
      set({
        myLibrariesError: "로그인이 필요한 서비스입니다.",
        isMyLibrariesLoading: false,
      });
      return;
    }

    try {
      const response = await axios.get("users/my-libraries/list/", {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      set({
        myLibraries: response.data.libraries,
        isMyLibrariesLoading: false,
      });
    } catch (error) {
      set({
        myLibrariesError: "'내도서관' 목록을 불러오지 못했습니다.",
        isMyLibrariesLoading: false,
      });
      console.error("Failed to fetch my libraries:", error);
    }
  },

  //전체 도서관 API
  fetchAllLibraries: async () => {
    set({ isAllLibrariesLoading: true, allLibrariesError: null });

    try {
      const response = await axios.get("library/list/");

      set({ allLibraries: response.data, isAllLibrariesLoading: false });
    } catch (err) {
      set({
        allLibrariesError: "전체 도서관 목록을 불러오는 데 실패했습니다.", // (O)
        isAllLibrariesLoading: false,
      });
      console.error("Failed to fetch libraries:", err);
    }
  },
}));

export default useLibrarySidebarStore;
