import React from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Layout/BottomNavBar";
import TopNavBar from "../components/Layout/TopNavBar";
import codeit from "../assets/icons/codeit.png";

// --- 아이콘 임포트 ---
import { ReactComponent as LibraryIcon } from "../assets/icons/library.svg";
import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import BannerCard from "../components/BannerCard";

const bannerData = [
  {
    title: "집에서 잠든 책,\n우리 동네 도서관으로!",
    description: "상태 좋은 책 기증하고,\n지역화폐 리워드까지 받아가세요",
  },
  {
    title: "Step1.\n우리 동네 도서관으로!",
    description: "도서관 방문 후 책 스캔해보세요.",
  },
  {
    title: "Step2.\n바코드 인식 책 확인",
    description: "표지, 제목이 맞는지 확인하세요.",
  },
  {
    title: "Step3.\n나눔하기 / 데려가기 완료",
    description:
      "나눔하기 | 책을 나눔하고 포인트를 받아요\n데려가기 | 선택한 책을 데려가요",
  },
];

const MainPage = () => {
  const navigate = useNavigate();

  const handleSidebarClick = () => navigate("/"); // 사이드바 기능으로 변경 가능
  const handleNotificationClick = () => navigate("/notifications");
  const handleSearchClick = () => navigate("/search");
  const handle나눔Button = () => navigate("/");
  const handle데려가기Button = () => navigate("/");

  return (
    <>
      <TopNavBar
        leftControls={
          <TopNavBar.IconButton
            onClick={handleSidebarClick}
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
        <Title>서비스명 가이드</Title>

        <BannerWrapper>
          {bannerData.map((banner, index) => (
            <BannerCard
              key={index}
              title={banner.title}
              description={banner.description}
            />
          ))}
        </BannerWrapper>

        <ButtonWrapper>
          <ActionButton onClick={handle나눔Button}>나눔하기</ActionButton>
          <ActionButton onClick={handle데려가기Button}>데려가기</ActionButton>
        </ButtonWrapper>

        <Title>AI가 고른 OO님 취향 맞춤 책 리스트</Title>

        <Outlet />
      </MainContainer>

      <BottomNavBar />
    </>
  );
};

export default MainPage;

// 콘텐츠를 담을 컨테이너
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; /* 모든 자식 요소를 가로축 중앙에 정렬 */
  gap: 24px; /* 자식 요소들 사이의 수직 간격을 24px로 설정 */

  width: 100%;
  max-width: 600px;
  min-height: 100%;

  /* 상단/하단 바 공간 확보를 위한 패딩 */
  padding-top: 110px; /* 검색창 위의 여백은 패딩으로 조절 */
  padding-bottom: 80px;
  padding-left: 20px;
  padding-right: 20px;

  background-color: white;
`;

const LogoContainer = styled.img`
  width: 50%;
  max-width: 200px;
`;

// ... MainPage 컴포넌트 및 다른 코드는 그대로 유지

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  font-weight: 500;

  width: 100%;
  height: 38px;

  background-color: #e7efda;
  border: none;
  border-radius: 50px;
  color: #7b7b7b;
  cursor: pointer;

  font-size: 14px;
  padding: 0 16px;

  svg {
    margin-right: 8px;
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 135px; /* (280px / 2) - 좌우 여백 */
  height: 47px;

  background-color: #4f614a;
  color: white;
  border: none;
  border-radius: 50px;

  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  transition: opacity 0.2s; /* 부드러운 효과 */

  &:hover {
    opacity: 0.9;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px; /* 버튼 사이의 간격 */
`;

const Title = styled.h1`
  width: 100%;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
`;

const BannerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  width: 100%; /* 부모 컨테이너 너비에 맞춤 */

  /* 스크롤바는 숨김 처리 */
  &::-webkit-scrollbar {
    display: none;
  }
`;
