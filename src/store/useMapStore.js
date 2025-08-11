import { create } from "zustand";

const useMapStore = create((set) => ({
  map: null,
  setMap: (mapInstance) => set({ map: mapInstance }),

  markers: [],
  setMarkers: (newMarkers) => set({ markers: newMarkers }),
  clearMarkers: () =>
    set((state) => {
      state.markers.forEach((marker) => marker.setMap(null));
      return { markers: [] };
    }),
}));

export default useMapStore;
