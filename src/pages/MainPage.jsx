import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Layout/BottomNavBar";
import TopNavBar from "../components/Layout/TopNavBar";
import BookCard from "../components/BookCard";
import BannerCard from "../components/BannerCard";
import useUserStore from "../store/useUserStore";
import LibrarySidebar from "../components/mapComponents/LibrarySidebar";
import useLibrarySidebarStore from "../store/useLibrarySidebarStore";

// --- 아이콘 임포트 ---
import { ReactComponent as LibraryIcon } from "../assets/icons/library.svg";
import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as Library1 } from "../assets/icons/Library1.svg";
import { ReactComponent as Library2 } from "../assets/icons/Library2.svg";
import { ReactComponent as Library3 } from "../assets/icons/Library3.svg";
import { ReactComponent as Library4 } from "../assets/icons/Library4.svg";
import { ReactComponent as MainLogo } from "../assets/icons/logo.svg";

const bannerData = [
  {
    id: 1,
    title: "집에서 잠든 책,\n우리 동네 도서관으로!",
    description: "상태 좋은 책 기증하고, \n지역화폐 리워드까지 받아가세요",
    icon: Library1,
  },
  {
    id: 2,
    step: "Step1",
    title: "우리 동네 도서관으로!",
    description: "도서관 방문 후 책 스캔해보세요.",
    icon: Library2,
  },
  {
    id: 3,
    step: "Step2",
    title: "바코드 인식 책 확인",
    description: "표지, 제목이 맞는지 확인하세요.",
    icon: Library3,
  },
  {
    id: 4,
    step: "Step3",
    title: "나눔하기 / 데려가기 완료",
    description:
      "나눔하기 | 책을 나눔하고 포인트를 받아요\n데려가기 | 선택한 책을 데려가요",
    icon: Library4,
  },
];

const bookListData = [
  {
    id: 1,
    imageUrl: "https://placehold.co/100x140",
    title: "여행의 이유",
    author: "김영하",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/100x140",
    title: "달러구트 꿈 백화점",
    author: "이미예",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/100x140",
    title: "아몬드",
    author: "손원평",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/100x140",
    title: "불편한 편의점",
    author: "김호연",
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/100x140",
    title: "코스모스",
    author: "칼 세이건",
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/100x140",
    title: "사피엔스",
    author: "유발 하라리",
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const toggleSidebar = useLibrarySidebarStore((state) => state.toggleSidebar);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const userNickName = user?.nickname;

  const handleNotificationClick = () => navigate("/notifications");
  const handleSearchClick = () => navigate("/search/book");
  const handle나눔Button = () => navigate("/barcode/library/select/give");
  const handle데려가기Button = () => navigate("/barcode/library/select/take");

  return (
    <PageWrapper>
      <LibrarySidebar />
      <TopNavBar
        leftControls={
          <TopNavBar.IconButton
            onClick={toggleSidebar}
            aria-label="도서관 사이드바"
          >
            {" "}
            <LibraryIcon fill={"#0D8847"} width={24} height={24} />{" "}
          </TopNavBar.IconButton>
        }
        title={
          <LogoContainer>
            <MainLogo />
          </LogoContainer>
        }
        rightControls={
          <TopNavBar.IconButton
            onClick={handleNotificationClick}
            aria-label="알림 보기"
          >
            {" "}
            <BellIcon width={24} height={24} />{" "}
          </TopNavBar.IconButton>
        }
      />

      <MainContainer>
        <SearchButton onClick={handleSearchClick}>
          <SearchIcon fill={"#6F6F6F"} width={20} height={20} />
          관심있는 책을 검색해보세요!
        </SearchButton>
        <Title>
          <GreenTitle>북작북작</GreenTitle> 가이드
        </Title>

        <BannerWrapper>
          {bannerData.map((banner) => (
            <BannerCard key={banner.id} {...banner} />
          ))}
        </BannerWrapper>

        <ButtonWrapper>
          <ActionButton1 onClick={handle나눔Button}>나눔하기</ActionButton1>
          <ActionButton2 onClick={handle데려가기Button}>데려가기</ActionButton2>
        </ButtonWrapper>

        <BookListSection>
          <Title2>
            {`AI가 고른 ${userNickName || "아기사자"}님 \n취향 맞춤 책 리스트`}
          </Title2>
          <HorizontalScroll>
            {bookListData.map((book) => (
              <BookCardWrapper key={book.id}>
                <BookCard book={book} />
              </BookCardWrapper>
            ))}
          </HorizontalScroll>
        </BookListSection>

        <button
          onClick={() => {
            logout();
          }}
        >
          임시 로그아웃 버튼입니당
        </button>
        <Outlet />
      </MainContainer>

      <BottomNavBar />
    </PageWrapper>
  );
};

export default MainPage;

// --- Styled Components (반응형 최종 수정) ---

const PageWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  max-width: 600px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MainContainer = styled.main`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 80px 20px 80px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LogoContainer = styled.div`
  height: 30px;
  width: auto;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  width: 100%;
  height: 42px;
  background-color: #f0f2f5;
  border: none;
  border-radius: 50px;
  color: #6f6f6f;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  padding: 16px 16px;
  font-family: inherit;
  margin-bottom: 8px;
`;

const ActionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 47px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  padding: 0 8px;
  white-space: nowrap;
  margin: 8px 0;
  font-family: inherit;
  margin-bottom: 32px;
`;

const ActionButton1 = styled(ActionButton)`
  background-color: #11b55f;
  color: white;
  border: none;
  &:hover {
    background-color: #0fa356;
    transition: 0.3s ease;
  }

  &:active {
    background-color: #0e914c;
  }
`;

const ActionButton2 = styled(ActionButton)`
  background-color: transparent;
  color: #11b55f;
  border: 2px solid #11b55f;

  &:hover {
    background-color: #dbf4e7;
    border: 2px solid transparent;
    transition: 0.3s ease;
  }

  &:active {
    background-color: #b5e8cd;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

const Title = styled.h1`
  width: 100%;
  text-align: left;
  font-size: 22px;
  font-weight: 600;
  margin: 8px 0;
`;

const Title2 = styled.h2`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  white-space: pre-line;
`;

const BannerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  width: calc(100% + 40px);
  margin: 0 -20px;
  padding: 4px 20px;
  min-height: 220px;

  // 아이폰 빙글빙글 돌리는 버그 멈추기
  -webkit-overflow-scrolling: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GreenTitle = styled.span`
  color: #11b55f;
`;

const HorizontalScroll = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  width: calc(100% + 40px);
  padding: 4px 20px 10px 20px;
  margin: 0 -20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BookCardWrapper = styled.div`
  flex: 0 0 110px;
  display: flex;
`;

const BookListSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
