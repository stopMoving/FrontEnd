import { create } from "zustand";
import axios from "../lib/axios"; // 프로젝트의 axios 인스턴스 경로

const useUserStore = create((set, get) => ({
  user: null, // 로그인된 사용자 정보
  token: null, // 인증 토큰
  isInitialized: false, // 로컬 스토리지에서 토큰을 확인했는지 여부

  // 사용자 위치정보
  location: null,
  isLocationLoading: false,
  locationError: null,

  setUserAndToken: (user, token) => {
    // axios의 모든 요청 헤더에 인증 토큰을 default로 설정
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token.access_token}`;
    // 로컬 스토리지에 토큰을 저장하여 페이지를 새로고침해도 로그인 유지!
    localStorage.setItem("authToken", JSON.stringify(token));
    set({ user, token });
  },

  // 로그인 리퀘스트
  login: async (credentials) => {
    try {
      const response = await axios.post("accounts/login/", credentials);
      const { user, token } = response.data;
      get().setUserAndToken(user, token);
      return user;
    } catch (error) {
      console.error("로그인 실패:", error);
      throw error;
    }
  },

  // 회원가입 리퀘스트
  register: async (userData) => {
    try {
      await axios.post("accounts/join/", userData);
      const user = await get().login({
        username: userData.username,
        password: userData.password1,
      });
      return user;
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  },

  //로그아웃 리퀘스트
  logout: () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },

  initializeAuth: async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const token = JSON.parse(storedToken); // 저장된 문자열을 다시 객체로 변환
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.access_token}`;
        const response = await axios.get("/users/profile/"); // 내 정보를 가져오는 API
        set({ user: response.data, token });
      } catch (error) {
        // 토큰이 유효하지 않은 경우 (만료 등), 로그아웃 처리
        get().logout();
      }
    }
    set({ isInitialized: true });
  },

  // 사용자 위치정보 받기
  fetchLocation: () => {
    set({ isLocationLoading: true, locationError: null });

    if (!navigator.geolocation) {
      set({
        locationError: "Geolocation을 지원하지 않는 브라우저입니다.",
        isLocationLoading: false, // 로딩 상태를 다시 false로 변경
      });
      return;
    }
    //위치 정보 가져오기 성공 시 실행되는 함수
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        set({
          location: { latitude, longitude },
          isLocationLoading: false,
        });
      },

      //위치 정보 가져오기 실패 시 실행되는 함수
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
