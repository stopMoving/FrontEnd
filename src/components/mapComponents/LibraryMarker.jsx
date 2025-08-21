/* global kakao */
import React, { useEffect } from "react";

const LibraryMarker = ({ library, map }) => {
  const { kakao } = window;

  useEffect(() => {
    if (!map || !kakao || !kakao.maps || !library) {
      console.log("Missing dependencies:", { map, kakao, library });
      return;
    }
    console.log("Creating marker for:", library.name);
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(library.lat, library.lng),
      title: library.name,
    });

    return () => {
      console.log("Cleaning up marker for:", library.name);
      marker.setMap(null);
    };
  }, [map, library]);

  return null;
};

export default LibraryMarker;
