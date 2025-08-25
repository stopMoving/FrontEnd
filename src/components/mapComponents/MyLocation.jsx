import React, { useEffect } from "react";
import useUserStore from "../store/useUserStore";

function MyLocationComponent() {
  const { location, isLocationLoading, locationError, fetchLocation } =
    useUserStore();

  useEffect(() => {
    // 위치정보 리퀘스트
    fetchLocation();
  }, [fetchLocation]);

  if (isLocationLoading) {
    return <div>위치 정보 가져오는 중...</div>;
  }

  if (locationError) {
    return <div>위치 정보 오류: {locationError}</div>;
  }

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
