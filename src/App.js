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

const PrivateRoutes = () => {
  const { user, isInitialized } = useUserStore();

  if (!isInitialized) {
    return <div>로딩 중...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const { initializeAuth, isInitialized, fetchLocation, user } = useUserStore();
  // const navigate = useNavigate();
  // const location = useLocation();

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />

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
          <Route path="/book/:isbn" element={<BookDetailPage />} />
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
          <Route path="barcode/library/select/:mode" element={<LibrarySelectPage />} />
          <Route path="barcode/select/:mode" element={<SelectPage />} />
          <Route path="barcode/scan/:mode" element={<ScanPage />} />
          <Route path="barcode/booklist/:mode" element={<BookListPage />} />
          <Route path="loading" element={<LoadingPage />} />
        </Route>
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
