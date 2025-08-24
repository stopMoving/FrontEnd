/* global kakao */
// ESLint kakao가 전역변수임을 알 수 있도록 설정

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import markerIcon from "../../assets/images/mapMarker.png";

// 위도, 경도, 도서관 이름 받기
const StaticKakaoMap = ({ lat, lng, libraryName }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
        return;
      }
      const existingScript = document.querySelector(
        `script[src*="//dapi.kakao.com/v2/maps/sdk.js"]`
      );
      if (existingScript) {
        existingScript.onload = () => initMap();
        return;
      }

      const script = document.createElement("script");
      script.async = true;
      const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,clusterer&autoload=false`;

      // onload 핸들러를 먼저 등록
      script.onload = () => {
        initMap();
      };
      // onerror 핸들러도 등록
      script.onerror = () => {
        console.error("카카오맵 스크립트를 로드하는 데 실패했습니다.");
      };

      // 핸들러 등록 후 문서에 추가
      document.head.appendChild(script);
    };

    const initMap = () => {
      kakao.maps.load(() => {
        if (!mapContainer.current) return;

        const mapOption = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 4,
          draggable: false,
          scrollwheel: false,
          disableDoubleClickZoom: true,
        };
        const map = new kakao.maps.Map(mapContainer.current, mapOption);

        const imageSrc = markerIcon;
        const imageSize = new kakao.maps.Size(36, 36);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const markerPosition = new kakao.maps.LatLng(lat, lng);

        new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
          title: libraryName,
          map: map,
        });
      });
    };

    if (lat && lng) {
      loadKakaoMapScript();
    }
  }, [lat, lng, libraryName]);

  return <MapDiv ref={mapContainer}></MapDiv>;
};

export default StaticKakaoMap;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
