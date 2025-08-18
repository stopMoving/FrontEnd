/* global kakao */
import React, { useEffect, useRef, useState } from "react";

const KakaoMap = ({ children, center }) => {
  const mapContainer = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (
      !window.kakao ||
      !window.kakao.maps ||
      !center ||
      !mapContainer.current
    ) {
      return;
    }

    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, options);
      setMapInstance(map);

      setTimeout(() => {
        map.relayout();
      }, 0);
    });
  }, [center]);

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100%" }}>
      {mapInstance && React.cloneElement(children, { map: mapInstance })}
    </div>
  );
};

export default KakaoMap;
