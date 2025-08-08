import React from "react";
import GlobalStyle from "./Globalstyles/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import MainPage from "./pages/MainPage";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="map" element={<Map />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </AppContainer>
    </>
  );
};

export default App;

const AppContainer = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;
