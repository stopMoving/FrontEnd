import React, { useEffect } from "react";
import useMapStore from "../../store/useMapStore";

const KakaoMap = () => {
  const setMap = useMapStore((state) => state.setMap);
  const BASE_LOCATION = {
    lat: 37.505298,
    lng: 126.957113,
  };

  useEffect(() => {
    // kakao를 window전역객체로 설정
    const { kakao } = window;
    if (!kakao || !kakao.maps) return;

    // map 가져오기 핵심 로직
    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const options = {
        // 지도 중심부 위도 경도 입력
        center: new kakao.maps.LatLng(BASE_LOCATION.lat, BASE_LOCATION.lng),
        level: 3,
      };

      const mapInstance = new kakao.maps.Map(mapContainer, options);
      setMap(mapInstance);
    });

    //클린업 함수 메모리 누수 방지
    return () => {
      setMap(null);
    };
  }, [setMap]);

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
};

export default KakaoMap;
