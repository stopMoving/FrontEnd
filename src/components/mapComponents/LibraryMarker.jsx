import React, { useEffect } from "react";
import useMapStore from "../../store/useMapStore";

/**
 * 지도 위에 단일 마커를 표시하는 컴포넌트
 * @param {object} library - { lat, lng, name } 형태의 도서관 정보 객체
 */
const LibraryMarker = ({ library }) => {
  // Zustand 스토어에서 map 객체를 가져옵니다.
  const map = useMapStore((state) => state.map);
  const { kakao } = window;

  useEffect(() => {
    // map 객체, kakao API, library 데이터가 모두 준비되었을 때만 마커를 생성합니다.
    if (!map || !kakao || !kakao.maps || !library) {
      return;
    }

    // 마커를 생성합니다.
    const marker = new kakao.maps.Marker({
      // 마커를 표시할 지도
      map: map,
      // 마커를 표시할 위치 (위도, 경도)
      position: new kakao.maps.LatLng(library.lat, library.lng),
      // 마커에 마우스를 올렸을 때 표시될 이름
      title: library.name,
    });

    // 컴포넌트가 언마운트(사라질 때)될 때 마커를 지도에서 제거합니다. (메모리 누수 방지)
    return () => {
      marker.setMap(null);
    };
    // map, kakao, library 객체가 변경될 때마다 이 효과를 다시 실행합니다.
  }, [map, kakao, library]);

  // 이 컴포넌트는 지도 조작이 목적이므로, 실제 DOM에는 아무것도 렌더링하지 않습니다.
  return null;
};

export default LibraryMarker;
