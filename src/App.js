import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="map" element={<Map />} />
      </Routes>
    </>
  );
};

export default App;
