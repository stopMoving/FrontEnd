import React, { useEffect } from "react";
import useMapStore from "../../store/useMapStore";

const KakaoMap = ({ children }) => {
  // setMap 뿐만 아니라 map 객체도 가져옵니다.
  const { map, setMap } = useMapStore();

  const BASE_LOCATION = {
    lat: 37.505298,
    lng: 126.957113,
  };

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !kakao.maps) return;

    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(BASE_LOCATION.lat, BASE_LOCATION.lng),
        level: 3,
      };
      const mapInstance = new kakao.maps.Map(mapContainer, options);
      setMap(mapInstance);
    });

    return () => {
      setMap(null);
    };
  }, [setMap]);

  return (
    <div id="map" style={{ width: "100%", height: "100%" }}>
      {/* map 객체가 생성되었을 때만 children(마커 등)을 렌더링합니다. */}
      {map && children}
    </div>
  );
};

export default KakaoMap;
