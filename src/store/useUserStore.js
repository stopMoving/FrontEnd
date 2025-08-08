import { create } from "zustand";

const useUserStore = create((set) => ({
  // 1. state: 관리할 상태값들
  user: null, // 로그인된 사용자 정보
  isLoading: true, // 로딩 상태 (앱 시작 시 사용자 정보를 받아오는 동안 true)

  // 2. actions: 상태를 변경하는 함수들
  setUser: (user) => {
    set({ user: user, isLoading: false });
  },
}));

export default useUserStore;
