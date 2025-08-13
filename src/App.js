import { useEffect } from "react";
https://github.com/stopMoving/FrontEnd/pull/16/conflict?name=src%252FApp.js&ancestor_oid=043daffc514e941f446f91bacd4840d9d0fc097b&base_oid=1636115ab48e22875c30ebfdb0a6adef8a17f532&head_oid=b8a6a7e339b3c0ec90479b556c5c01a2169f82d6import GlobalStyle from "./Globalstyles/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import styled from "styled-components";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegitserPage";
import WelcomePage from "./pages/RegisterPage/WelcomePage";
import useUserStore from "./store/useUserStore";
import { Toaster } from "./store/useToasterStore";
import SelectPage from "./pages/BarcodePage/SelectPage";
import ScanPage from "./pages/BarcodePage/ScanPage";


import UploadPage from "./pages/BarcodePage/UploadPage";
import BookListPage from "./pages/BarcodePage/BookListPage";
import LibrarySelectPage from "./pages/BarcodePage/LibrarySelectPage";
import InputPage from "./pages/BarcodePage/InputPage";
import LibraryDetailPage from "./pages/LibraryPage/LibraryDetailPage";


const App = () => {
  // ✅ 스토어에서 initializeAuth 함수와 상태를 가져옵니다.
  const { initializeAuth, isInitialized, fetchLocation } = useUserStore();

  // ✅ 앱이 처음 마운트될 때 딱 한 번만 실행합니다.
  useEffect(() => {
    initializeAuth();
    fetchLocation();
  }, [initializeAuth, fetchLocation]);

  if (!isInitialized) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="main" element={<MainPage />} />
        <Route path="barcode/library/select/:mode" element={<LibrarySelectPage />} />
        <Route path="barcode/select/:mode" element={<SelectPage />} />
        <Route path="barcode/scan" element={<ScanPage />} />
        <Route path="barcode/upload" element={<UploadPage />} />
        <Route path="barcode/input_ISBN" element={<InputPage />} />
        <Route path="barcode/booklist/:mode" element={<BookListPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/library/:id" element={<LibraryDetailPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;

// const AppContainer = styled.div`
//   width: 100%;
//   max-width: 600px;
//   height: 100%;
//   background-color: white;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//   padding: 20px;
// `;
