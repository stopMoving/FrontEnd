import { create } from "zustand";

const useMapStore = create((set) => ({
  // map 상태 관리
  map: null,
  // 생성된 지도 객체 받아와서 덮어쓰기
  setMap: (mapInstance) => set({ map: mapInstance }),

  // marker 상태 관리
  marker: [],
  // 마커 인스턴스 받아와서 덮어씌워주기
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  // 마커 지우기
  clearMarkers: () =>
    set((state) => {
      state.markers.forEach((marker) => marker.setMap(null));
      return { marker: [] };
    }),
}));

export default useMapStore;
