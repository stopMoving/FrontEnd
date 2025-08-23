/* global kakao */
// ESLint kakao가 전역변수임을 알 수 있도록 설정

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import markerIcon from "../../assets/images/mapMarker.png";

// 위도, 경도, 도서관 이름 받기
const StaticKakaoMap = ({ lat, lng, libraryName }) => {
  // 지도 담기 DOM 레퍼런스 생성
  console.log("지도 컴포넌트 Props 수신: ", { lat, lng, libraryName });
  const mapContainer = useRef(null);

  useEffect(() => {
    console.log("useEffect 실행, 지도 컨테이너:", mapContainer.current);
    // 카카오 SDK 먼저 찾고
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다.");
      return;
    }

    // 지도 그리기
    kakao.maps.load(() => {
      console.log("4: 지도 생성 로직 진입");
      const mapOption = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
        draggable: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
      };

      // 지도 생성
      const map = new kakao.maps.Map(mapContainer.current, mapOption);

      // 마커 만들기
      const imageSrc = markerIcon; // 마커 이미지
      const imageSize = new kakao.maps.Size(36, 36); // 마커사이즈
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커 위치
      const markerPosition = new kakao.maps.LatLng(lat, lng);

      // 마커 생성 및 지도에 표시
      new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 커스텀 마커 이미지 설정
        title: libraryName, // 마커에 마우스를 올리면 표시될 타이틀
        map: map, // 마커를 표시할 지도 객체
      });
    });
    // 디펜던시에 위도 경도 도서관 이름
  }, [lat, lng, libraryName]);

  return <MapDiv ref={mapContainer}></MapDiv>;
};

export default StaticKakaoMap;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;
