import React, { useEffect } from "react";
import useMapStore from "../../store/useMapStore";

// 1. props로 center를 받도록 수정합니다.
const KakaoMap = ({ children, center }) => {
  const { map, setMap } = useMapStore();

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !kakao.maps || !center) return; // 3. center 값이 있을 때만 실행

    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const options = {
        // 2. props로 받은 center 값을 사용합니다.
        center: new kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };
      const mapInstance = new kakao.maps.Map(mapContainer, options);
      setMap(mapInstance);
    });

    return () => {
      setMap(null);
    };
    // 4. center 값이 변경될 때마다 지도를 다시 로드합니다.
  }, [setMap, center]);

  return (
    <div id="map" style={{ width: "100%", height: "100%" }}>
      {map && children}
    </div>
  );
};

export default KakaoMap;
