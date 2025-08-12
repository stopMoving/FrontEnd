import { create } from "zustand";
import axios from "../lib/axios"; // 프로젝트의 axios 인스턴스 경로

// Zustand 스토어 생성
const useUserStore = create((set, get) => ({
  // --- 1. State (상태) ---
  user: null, // 로그인된 사용자 정보 (예: { id, name })
  token: null, // 인증 토큰 (JWT)
  isInitialized: false, // 로컬 스토리지에서 토큰을 확인했는지 여부

  // 사용자 위치정보 추가
  location: null,
  isLocationLoading: false,
  locationError: null,
  // --- 2. Actions (상태 변경 함수) ---

  /**
   * 사용자 정보와 토큰을 상태에 저장하고, axios 헤더에 토큰을 설정합니다.
   * @param {object} user - 사용자 정보 객체
   * @param {string} token - 인증 토큰
   */
  setUserAndToken: (user, token) => {
    // axios의 모든 요청 헤더에 인증 토큰을 기본으로 포함시킵니다.
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token.access_token}`;
    // 로컬 스토리지에 토큰을 저장하여 페이지를 새로고침해도 로그인 유지
    localStorage.setItem("authToken", JSON.stringify(token));
    // 상태 업데이트
    set({ user, token });
  },

  /**
   * 로그인을 처리하는 함수
   * @param {object} credentials - { id, password }
   */
  login: async (credentials) => {
    try {
      // 서버에 로그인 요청을 보냅니다.
      const response = await axios.post("accounts/login/", credentials);
      const { user, token } = response.data;
      // 성공 시, 받아온 사용자 정보와 토큰을 저장합니다.
      get().setUserAndToken(user, token);
      return user;
    } catch (error) {
      console.error("로그인 실패:", error);
      // 실제 앱에서는 토스트 메시지 등으로 에러를 표시하는 것이 좋습니다.
      throw error;
    }
  },

  /**
   * 회원가입을 처리하는 함수
   * @param {object} userData - { username, nickname, password1, password2 }
   */
  register: async (userData) => {
    try {
      // 서버에 회원가입 요청을 보냅니다. (API 주소는 실제 주소로 변경 필요)
      await axios.post("accounts/join/", userData);
      // 회원가입 성공 시, 바로 로그인 처리를 시도합니다.
      await get().login({
        username: userData.username,
        password: userData.password1,
      });
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  },

  /**
   * 로그아웃을 처리하는 함수
   */
  logout: () => {
    // axios 헤더와 로컬 스토리지에서 토큰을 제거합니다.
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
    // 상태를 초기화합니다.
    set({ user: null, token: null });
  },

  /**
   * 앱 시작 시, 로그인 상태를 복구하는 함수
   */
  initializeAuth: async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const token = JSON.parse(storedToken); // 저장된 문자열을 다시 객체로 변환
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.access_token}`;
        const response = await axios.get("/users/me/"); // 내 정보를 가져오는 API
        set({ user: response.data, token });
      } catch (error) {
        // 토큰이 유효하지 않은 경우 (만료 등), 로그아웃 처리
        get().logout();
      }
    }
    set({ isInitialized: true });
  },
  fetchLocation: () => {
    set({ isLocationLoading: true, locationError: null });

    if (!navigator.geolocation) {
      set({
        locationError: "Geolocation을 지원하지 않는 브라우저입니다.",
        isLocationLoading: false, // 로딩 상태를 다시 false로 변경
      });
      return;
    }
    //위치 정보 가져오기 성공 시 실행되는 콜백 함수
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        set({
          location: { latitude, longitude },
          isLocationLoading: false,
        });
      },

      //위치 정보 가져오기 실패 시 실행되는 콜백 함수
      (error) => {
        set({
          locationError: error.message,
          isLocationLoading: false,
        });
      }
    );
  },
}));

export default useUserStore;
