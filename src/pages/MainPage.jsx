import React from "react";
import styled from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/Layout/BottomNavBar";
import TopNavBar from "../components/Layout/TopNavBar";
import codeit from "../assets/icons/codeit.png";

// --- 아이콘 임포트 ---
import { ReactComponent as LibraryIcon } from "../assets/icons/library.svg";
import { ReactComponent as BellIcon } from "../assets/icons/bell.svg";

const MainPage = () => {
  const navigate = useNavigate();

  const handleSidebarClick = () => navigate("/"); // 사이드바 기능으로 변경 가능
  const handleNotificationClick = () => navigate("/notifications");

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
        <Outlet />
      </MainContainer>

      <BottomNavBar />
    </>
  );
};

export default MainPage;

// 콘텐츠를 담을 컨테이너
const MainContainer = styled.main`
  width: 100%;
  max-width: 600px;
  min-height: 100%; /* 콘텐츠가 적어도 화면 전체 높이를 차지하도록 */
  background-color: white;

  /* 상단/하단 바 공간 확보를 위한 패딩 */
  /* 상단 바 높이(50px) + 추가 여백(20px) */
  padding-top: 70px;
  /* 하단 바 높이(60px) + 추가 여백(20px) */
  padding-bottom: 80px;
  /* 좌우 여백 */
  padding-left: 20px;
  padding-right: 20px;
`;

const LogoContainer = styled.img`
  width: 50%;
  max-width: 200px;
`;
