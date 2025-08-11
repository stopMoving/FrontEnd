import React from "react";
import LibraryMarker from "../../components/mapComponents/LibraryMarker";
import KakaoMap from "../../components/mapComponents/KakaoMap";

const Map = () => {
  // 표시할 도서관 데이터 예시
  const sampleLibrary = {
    lat: 37.505298,
    lng: 126.957113,
    name: "동작도서관",
  };

  return (
    // 지도의 크기를 부모 div에서 지정해줍니다.
    <div style={{ width: "100vw", height: "100vh" }}>
      <KakaoMap>
        {/* KakaoMap의 자식으로 LibraryMarker를 렌더링합니다. */}
        <LibraryMarker library={sampleLibrary} />
      </KakaoMap>
    </div>
  );
};

export default Map;
