import { useEffect } from "react";
import GlobalStyle from "./Globalstyles/GlobalStyle";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegitserPage";
import WelcomePage from "./pages/RegisterPage/WelcomePage";
import useUserStore from "./store/useUserStore";
import { Toaster } from "./store/useToasterStore";
import SelectPage from "./pages/BarcodePage/SelectPage";
import ScanPage from "./pages/BarcodePage/ScanPage";
import BookListPage from "./pages/BarcodePage/BookListPage";
import LibrarySelectPage from "./pages/BarcodePage/LibrarySelectPage";
import LibraryDetailPage from "./pages/LibraryPage/LibraryDetailPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import SearchPage from "./pages/SearchPage";
import BookInfoPage from "./pages/BookInfoPage";
import SharedBooksPage from "./pages/LibraryPage/SharedBooksPage";
import BookDetailPage from "./pages/LibraryPage/BookDetailPage";
import MyPage from "./pages/MyPage";
import AiRecommendPage from "./pages/AiPage/AiRecommendPage";
import NotificationPage from "./pages/NotificationPage";
import DonateHistoryPanel from "./components/mypageComponents/DonateHistoryPanel";
import LoadingPage from "./pages/LoadingPage.jsx";
import LandingPage from "./pages/RegisterPage/LandingPage";
import AiPreferencePage from "./pages/AiPage/AiPreferencePage";
import styled from "styled-components";

const PrivateRoutes = () => {
  const { user, isInitialized } = useUserStore();

  if (!isInitialized) {
    return (
      <LodaingWrapper>
        <LoadingPage />
      </LodaingWrapper>
    );
  }

  return user ? <Outlet /> : <Navigate to="/landing" />;
};

const App = () => {
  const { initializeAuth, isInitialized, fetchLocation } = useUserStore();
  useEffect(() => {
    initializeAuth();
    fetchLocation();
  }, [initializeAuth, fetchLocation]);

  if (!isInitialized) {
    return (
      <LodaingWrapper>
        <LoadingPage />
      </LodaingWrapper>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/landing" element={<LandingPage />} />

        {/* 사용자 정보가 없으면 랜딩페이지로 이동 */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route
            path="/mypage/donated-books"
            element={<DonateHistoryPanel />}
          />
          <Route path="/library/detail/:id" element={<LibraryDetailPage />} />
          <Route path="/library/:libraryId" element={<LibraryPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/ai/recommand" element={<AiRecommendPage />} />
          <Route path="/ai/preference" element={<AiPreferencePage />} />
          <Route
            path="/library/:libraryId/book/:isbn"
            element={<BookDetailPage />}
          />
          <Route
            path="/library/:libraryId/shared"
            element={<SharedBooksPage />}
          />

          <Route path="search/book" element={<SearchPage />} />
          <Route path="search/book/info/:isbn" element={<BookInfoPage />} />
          <Route
            path="barcode/library/select/:mode"
            element={<LibrarySelectPage />}
          />

          <Route path="search/book" element={<SearchPage />} />
          <Route path="search/book-detail" element={<BookInfoPage />} />
          <Route
            path="barcode/library/select/:mode"
            element={<LibrarySelectPage />}
          />
          <Route path="barcode/select/:mode" element={<SelectPage />} />
          <Route path="barcode/scan/:mode" element={<ScanPage />} />
          <Route path="barcode/booklist/:mode" element={<BookListPage />} />
          <Route path="loading" element={<LoadingPage />} />
        </Route>
      </Routes>
      {/* Toaster 호출 */}
      <Toaster />
    </>
  );
};

export default App;

const LodaingWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  max-width: 600px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: white;
`;
