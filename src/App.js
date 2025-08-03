import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
