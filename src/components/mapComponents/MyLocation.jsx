import React, { useEffect } from "react";
import useUserStore from "../store/useUserStore";

function MyLocationComponent() {
  // 스토어에서 필요한 상태와 액션을 가져옵니다.
  const { location, isLocationLoading, locationError, fetchLocation } =
    useUserStore();

  // 컴포넌트가 처음 렌더링될 때 위치 정보를 요청합니다.
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // 로딩 중일 때 표시할 UI
  if (isLocationLoading) {
    return <div>위치 정보 가져오는 중...</div>;
  }

  // 에러 발생 시 표시할 UI
  if (locationError) {
    return <div>위치 정보 오류: {locationError}</div>;
  }

  // 성공적으로 위치 정보를 가져왔을 때 표시할 UI
  return (
    <div>
      {location ? (
        <>
          <h2>현재 위치</h2>
          <p>위도: {location.latitude}</p>
          <p>경도: {location.longitude}</p>
        </>
      ) : (
        <p>위치 정보를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}

export default MyLocationComponent;
