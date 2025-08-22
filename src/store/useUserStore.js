import { create } from "zustand";
import axios from "../lib/axios"; // 프로젝트의 axios 인스턴스 경로

const useUserStore = create((set, get) => ({
  //사용자 정보
  user: null,
  token: null,
  isInitialized: false,

  // 사용자 위치정보
  location: null,
  isLocationLoading: false,
  locationError: null,

  setUserAndToken: (user, token) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token.access_token}`;
    localStorage.setItem("authToken", JSON.stringify(token));
    set({ user, token });
  },

  initializeAuth: async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const token = JSON.parse(storedToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token.access_token}`;

        const response = await axios.get("users/profile/");
        console.log(response.data);
        set({ user: response.data, token });
      } catch (error) {
        get().logout();
      } finally {
        set({ isInitialized: true });
      }
    } else {
      set({ isInitialized: true });
    }
  },

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

  register: async (userData) => {
    try {
      await axios.post("accounts/join/", userData);
      await get().login({
        username: userData.username,
        password: userData.password1,
      });
    } catch (error) {
      console.error("회원가입 실패:", error);
      throw error;
    }
  },

  logout: () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },

  fetchLocation: () => {
    set({ isLocationLoading: true, locationError: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        set({
          location: {latitude, longitude},
          isLocationLoading: false,
        });
      },

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
