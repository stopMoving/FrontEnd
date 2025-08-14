import React from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Layout/BottomNavBar";
import TopNavBar from "../components/Layout/TopNavBar";
import codeit from "../assets/icons/codeit.png";
import BookCard from "../components/BookCard";

// --- 아이콘 임포트 ---
import { ReactComponent as LibraryIcon } from "../assets/icons/library.svg";
import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as Library1 } from "../assets/icons/Library1.svg";
import { ReactComponent as Library2 } from "../assets/icons/Library2.svg";
import { ReactComponent as Library3 } from "../assets/icons/Library3.svg";
import { ReactComponent as Library4 } from "../assets/icons/Library4.svg";

import BannerCard from "../components/BannerCard";
import useUserStore from "../store/useUserStore";

import LibrarySidebar from "../components/mapComponents/LibrarySidebar";
import useLibrarySidebarStore from "../store/useLibrarySidebarStore";

const bannerData = [
  {
    id: 1,
    // step이 없는 배너
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

// 나중에 AI API로 받아올 BookList 데이터
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
  {
    id: 7,
    imageUrl: "https://placehold.co/100x140",
    title: "데미안",
    author: "헤르만 헤세",
  },
  {
    id: 8,
    imageUrl: "https://placehold.co/100x140",
    title: "파친코",
    author: "이민진",
  },
  {
    id: 9,
    imageUrl: "https://placehold.co/100x140",
    title: "역사의 쓸모",
    author: "최태성",
  },
];

const MainPage = () => {
  const navigate = useNavigate();
  const toggleSidebar = useLibrarySidebarStore((state) => state.toggleSidebar);

  const user = useUserStore((state) => state.user);
  const userNickName = user?.nickname;

  const handleNotificationClick = () => navigate("/notifications");
  const handleSearchClick = () => navigate("/search");
  const handle나눔Button = () => navigate("/");
  const handle데려가기Button = () => navigate("/");

  return (
    <>
      <PageWrapper>
        <LibrarySidebar />
        <TopNavBar
          leftControls={
            <TopNavBar.IconButton
              onClick={toggleSidebar}
              aria-label="도서관 사이드바"
            >
              <LibraryIcon width={24} height={24} />
            </TopNavBar.IconButton>
          }
          title={<LogoContainer src={codeit} />}
          rightControls={
            <TopNavBar.IconButton
              onClick={handleNotificationClick}
              aria-label="알림 보기"
            >
              <BellIcon width={24} height={24} />
            </TopNavBar.IconButton>
          }
        />

        <MainContainer>
          <SearchButton onClick={handleSearchClick}>
            <SearchIcon width={24} height={24} />
            관심있는 책을 검색해보세요!
          </SearchButton>
          <Title>
            {" "}
            <GreenTitle>북작북작</GreenTitle> 가이드
          </Title>

          <BannerWrapper>
            {bannerData.map((banner) => (
              <BannerCard
                key={banner.id}
                step={banner.step}
                title={banner.title}
                description={banner.description}
                icon={banner.icon}
              />
            ))}
          </BannerWrapper>

          <ButtonWrapper>
            <ActionButton1 onClick={handle나눔Button}>나눔하기</ActionButton1>
            <ActionButton2 onClick={handle데려가기Button}>
              데려가기
            </ActionButton2>
          </ButtonWrapper>

          <Title>
            AI가 고른 {userNickName ? userNickName : "아기사자"}님 취향 맞춤 책
            리스트
          </Title>

          <BookGrid>
            {bookListData.slice(0, 6).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </BookGrid>

          <Outlet />
        </MainContainer>

        <BottomNavBar />
      </PageWrapper>
    </>
  );
};

export default MainPage;

// 콘텐츠를 담을 컨테이너
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  padding-top: 110px;
  padding-bottom: 80px;
  padding-left: 20px;
  padding-right: 20px;

  background-color: white;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const LogoContainer = styled.img`
  width: 50%;
  max-width: 200px;
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  font-weight: 500;

  width: 100%;
  height: 38px;

  background-color: #e6f4f0;
  border: none;
  border-radius: 50px;
  color: #6f6f6f;
  cursor: pointer;

  font-size: 14px;
  padding: 0 16px;

  svg {
    margin-right: 8px;
  }
`;

const ActionButton1 = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 47px;

  background-color: #11b55f;
  color: white;
  border: none;
  border-radius: 20px;

  font-size: 16px;

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ActionButton2 = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 47px;

  background-color: transparent;
  color: #009466;
  border: 2px solid #11b55f;
  border-radius: 20px;

  font-size: 16px;

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
`;

const Title = styled.h1`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  cursor: default;
`;

const BannerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GreenTitle = styled.span`
  color: #11b55f;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    3,
    1fr
  ); /* 3개의 열을 동일한 너비로 만듭니다. */
  gap: 16px; /* 아이템 사이의 간격 */
  width: 100%;
`;
